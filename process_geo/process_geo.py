import couchdb
import configparser
import time
import json
import sys
from shapely.geometry import shape, Point


def find_centroid(bbox):
    lon_centroid = (bbox[0] + bbox[2]) / 2
    lat_centroid = (bbox[1] + bbox[3]) / 2
    # print(lon_centroid, lat_centroid)
    return [lon_centroid, lat_centroid]


def get_zone_from_point(point, vic_map_data):
    # Loop over each zone in the map data
    for feature in vic_map_data['features']:
        polygon = shape(feature['geometry'])
        if polygon.contains(point):
            return feature['properties']['vic_lga__3']
    return None


def get_zone_from_bbox(bbox, vic_map_data):
    # Calculate the centroid of the bbox
    lon, lat = find_centroid(bbox)
    zone = get_zone_from_point(Point(lon, lat), vic_map_data)
    return zone


def get_docs(db, limit=100):
    result = db.view('_all_docs', limit=limit)
    return [db[row.id] for row in result]


def delete_docs(db, docs):
    for doc in docs:
        db.delete(doc)
        print(f"Document {doc['_id']} deleted")


def save_db(db, doc):
    doc_id, doc_rev = db.save(doc)
    print(f"Document saved with ID {doc_id}, revision {doc_rev}")


def process_geo_and_save_docs(target_db, no_zone_db, docs, vic_map_data):
    for doc in docs:
        bbox = doc['bbox']
        zone = get_zone_from_bbox(bbox, vic_map_data)
        if doc['city'] == 'geelong':
            zone = 'GREATER GEELONG'
        if doc['city'] == 'melbourne':
            zone = 'MELBOURNE'
        else:
            new_doc = {
                'author_id': doc['author_id'],
                'bbox': doc['bbox'],
                'city': doc['city'],
                'city_code': doc['city_code'],
                'context': doc['context'],
                'label': doc['labels'],
                'place_id': doc['place_id'],
                'score': doc['scores'],
                'zone': zone,
            }
            if zone is None:
                save_db(no_zone_db, new_doc)
                print(
                    f'Zone: {zone}, City: {doc["city"]}, bbox: {doc["bbox"]}')
                continue
            print(f'Zone: {zone}, City: {doc["city"]}, bbox: {doc["bbox"]}')
            save_db(target_db, new_doc)


def test_zone(lon, lat, vic_map_data):
    zone = get_zone_from_point(Point(lon, lat), vic_map_data)
    print(zone)


def main():
    # read map file
    with open('vic_geo.json', 'r') as f:
        vic_map_data = json.load(f)

    # Test zone function
    test_zone(144.962227, -37.812328, vic_map_data)

    # Connect to the database
    config = configparser.ConfigParser()
    config.read('config.ini')

    admin = config.get('couchDB', 'admin')
    password = config.get('couchDB', 'password')
    port = config.get('couchDB', 'port')
    ip = config.get('couchDB', 'ip')
    host = config.get('couchDB', 'host')
    server = couchdb.Server(f'http://{admin}:{password}@{ip}:{port}/')

    if sys.argv[1] == 'melb':
        source_db = config.get('tweet.2gmel', 'db_name')
    elif sys.argv[1] == 'vic':
        source_db = config.get('tweet.2rvic', 'db_name')
    else:
        print('Wrong argument, please use melb or vic')
        exit()

    if source_db in server:
        print(f"Database {source_db} found!")
        source = server[source_db]
    else:
        print(f"Database {source_db} not found!")
        source = server.create(source_db)

    if sys.argv[1] == 'melb':
        target_db = "tweet_2gmel_zone"
    elif sys.argv[1] == 'vic':
        target_db = "tweet_2rvic_zone"
    else:
        print('Wrong argument, please use melb or vic')
        exit()

    if target_db in server:
        print(f"Database {target_db} found!")
        target = server[target_db]
    else:
        print(f"Database {target_db} not found!")
        target = server.create(target_db)

    no_zone_db = "tweet_no_zone"
    if no_zone_db in server:
        print(f"Database {no_zone_db} found!")
        no_zone = server[no_zone_db]
    else:
        print(f"Database {no_zone_db} not found!")
        no_zone = server.create(no_zone_db)

    while True:
        docs = get_docs(source, limit=1)
        if len(docs) == 0:
            break
        process_geo_and_save_docs(target, no_zone, docs, vic_map_data)
        delete_docs(source, docs)


if __name__ == "__main__":
    main()
