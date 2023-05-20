import io
import os

import couchdb
import json
import configparser
from nlp import RelevanceGrader
import sys
from shapely.geometry import shape, Point


def find_location(location, city_suburb):
    # check if location is in Melbourne
    name_split = [i.strip().lower() for i in location.split(", ")]
    # try direct match
    for split in name_split:
        city_code = city_suburb.get(split)
        if city_code:
            return split
        # try transform to brackets
    abbrevs = {'victoria': 'vic.'}
    if len(name_split) > 1:
        city = name_split[0]
        state = abbrevs.get(name_split[1])
        if state:
            city_code = city_suburb.get(f"{city} ({state})")  # try city (state)
            if city_code:
                return f"{city} ({state})"
        # try split by -
        name_split = [i.strip().lower() for i in location.split(" - ")]
        city = name_split[0]
        if len(name_split) > 1:
            states = [abbrevs.get(s) or s for s in name_split[1].split(', ')]
            if len(states) < 2:
                return None
            formats = [
                f"{city} ({states[0]} - {states[1]})",  # try city (state1 - state2)
                f"{city} ({states[1]} - {states[0]})"  # try city (state2 - state1)
            ]
            for f in formats:
                city_code = city_suburb.get(f)
                if city_code:
                    return f
            # try match either city or both
            for state in states:
                city_code = city_suburb.get(f"{city} ({state})")
                if city_code:
                    return f"{city} ({state})"
    return None


def read_sal(city_suburb):
    with open('sal.json', 'r') as f:
        f.seek(0)
        lines = iter(f)

        buffer = io.StringIO()
        position = 0
        for line in lines:
            if line.startswith('  "'):
                # Process line
                buffer.write('{' + line)
                for i in range(3):
                    buffer.write(next(lines))
                buffer.write(next(lines)[:3] + '}')
                data_str = buffer.getvalue()
                position += len(data_str)
                buffer.close()
                buffer = io.StringIO()
                data = json.loads(data_str)
                for key, value in data.items():
                    if sys.argv[1] == 'vic' and value['gcc'] == '2rvic':
                        city_suburb[key] = value['sal']
                    elif sys.argv[1] == 'melb' and value['gcc'] == '2gmel':
                        city_suburb[key] = value['sal']
            else:
                position += len(line)
            if position >= os.path.getsize('sal.json'):
                break
        buffer.close()


def find_centroid(bbox):
    lon_centroid = (bbox[0] + bbox[2]) / 2
    lat_centroid = (bbox[1] + bbox[3]) / 2
    return lon_centroid, lat_centroid


def get_zone_from_bbox(cur_bbox, vic_map_data):
    # Calculate the centroid of the bbox
    lon, lat = find_centroid(cur_bbox)
    for feature in vic_map_data['features']:
        polygon = shape(feature['geometry'])
        if polygon.contains(Point(lon, lat)):
            return feature['properties']['vic_lga__3']
    return None


def save_db(db, doc):
    doc_id, doc_rev = db.save(doc)
    print(f"Document saved with ID {doc_id}, revision {doc_rev}")


def test_zone(lon, lat, vic_map_data):
    zone = get_zone_from_bbox([lon, lat, lon, lat], vic_map_data)
    print(zone)


def main():
    # Connect to the databases
    config = configparser.ConfigParser()
    config.read('config.ini')

    admin = config.get('couchDB', 'admin')
    password = config.get('couchDB', 'password')
    port = config.get('couchDB', 'port')
    ip = config.get('couchDB', 'ip')
    host = config.get('couchDB', 'host')
    server = couchdb.Server(f'http://{admin}:{password}@{ip}:{port}/')
    if sys.argv[1] == 'melb':
        db_name = config.get('readTwitter.melb', 'db_name')
    elif sys.argv[1] == 'vic':
        db_name = config.get('readTwitter.rvic', 'db_name')
    else:
        print("invalid argument, expected 'melb' or 'vic'")
        exit()

    if db_name in server:
        print(f"Database {db_name} found!")
        target_db = server[db_name]
    else:
        print(f"Database {db_name} not found!")
        target_db = server.create(db_name)

    no_zone_db = "tweet_no_zone"
    if no_zone_db in server:
        print(f"Database {no_zone_db} found!")
        no_zone = server[no_zone_db]
    else:
        print(f"Database {no_zone_db} not found!")
        no_zone = server.create(no_zone_db)

    # init nlp
    ng = RelevanceGrader()

    # read sal data
    city_suburb = {}
    read_sal(city_suburb)

    # read map file
    with open('vic_geo.json', 'r') as f:
        vic_map_data = json.load(f)

    # crash recover from line
    num_line = 0
    if len(sys.argv) > 2:
        num_line = int(sys.argv[2])

    with open('/home/ubuntu/twitter-huge.json', 'r') as file:
        print("File opened!")
        dicts = []
        messages = []
        counter = 0

        for line in file:
            if counter % 1000 == 0:
                print("counter: ", counter)
            counter += 1

            # recover from crash
            if counter < num_line:
                continue

            if line.startswith('{"id":"'):
                try:
                    tweet = json.loads(line[:-2])
                    # only want english, exist geo and has context
                    if tweet['doc']['data']['geo'] != {} \
                            and len(tweet['doc']['data']['text']) > 1 \
                            and tweet['doc']['data']['lang'] != 'en':
                        city = find_location(tweet['doc']['includes']['places'][0]['full_name'], city_suburb)
                        if city:
                            bbox = tweet['doc']['includes']['places'][0]['geo']['bbox']
                            zone = get_zone_from_bbox(bbox, vic_map_data)
                            # hardcode some zones
                            if city == 'geelong':
                                zone = 'GREATER GEELONG'
                            elif city == 'melbourne':
                                zone = 'MELBOURNE'

                            info = {
                                'author_id': tweet['doc']['data']['author_id'],
                                'zone': zone,
                            }
                            dicts.append(info)
                            messages.append(tweet['doc']['data']['text'])

                            if len(messages) >= 50:
                                if len(dicts) == len(messages):
                                    output = ng.grade(messages)
                                    if len(output) == len(messages):
                                        for i in range(len(output)):
                                            dicts[i]["context"] = output[i]['sequence']
                                            dicts[i]['labels'] = output[i]['labels']
                                            dicts[i]["scores"] = output[i]['scores']
                                            json_str = json.dumps(dicts[i], indent=2, sort_keys=True, default=str)
                                            print(json_str)
                                            if zone is None:
                                                save_db(no_zone, json.loads(json_str))
                                            save_db(target_db, json.loads(json_str))
                                dicts = []
                                messages = []
                except:
                    continue


if __name__ == '__main__':
    main()
