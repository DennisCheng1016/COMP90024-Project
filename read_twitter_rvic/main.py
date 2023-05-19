import io
import os

import couchdb
import json
import configparser
from nlp import RelevanceGrader

# Connect to the database
config = configparser.ConfigParser()
config.read('config.ini')

admin = config.get('couchDB', 'admin')
password = config.get('couchDB', 'password')
port = config.get('couchDB', 'port')
ip = config.get('couchDB', 'ip')
host = config.get('couchDB', 'host')
server = couchdb.Server(f'http://{admin}:{password}@{ip}:{port}/')
db_name = config.get('readTwitter', 'db_name')

if db_name in server:
    print(f"Database {db_name} found!")
    db = server[db_name]
else:
    print(f"Database {db_name} not found!")
    db = server.create(db_name)

ng = RelevanceGrader()

# read sal data
# analyse sal to get locations we care {suburb_name: greater city}
city_suburb = {}
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
                if value['gcc'] == '2rvic':
                    city_suburb[key] = value['sal']
        else:
            position += len(line)
        if position >= os.path.getsize('sal.json'):
            break
    buffer.close()


def find_location(location):
    location = tweet['doc']['includes']['places'][0]['full_name']
    # check if location is in Melbourne
    name_split = [i.strip().lower() for i in location.split(", ")]
    # try direct match
    for split in name_split:
        city_code = city_suburb.get(split)
        if city_code:
            return split, city_code
        # try transform to brackets
    abbrevs = {'victoria': 'vic.'}
    if len(name_split) > 1:
        city = name_split[0]
        state = abbrevs.get(name_split[1])
        if state:
            city_code = city_suburb.get(f"{city} ({state})")
            if city_code:
                return f"{city} ({state})", city_code
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
                    return f, city_code
            # try match either city or both
            for state in states:
                city_code = city_suburb.get(f"{city} ({state})")
                if city_code:
                    return (f"{city} ({state})", city_code)
    return None

with open('/tweet/Users/yu/COMP90024_TEAM47 Dropbox/CCC_A2_Data/mnt/ext100/twitter-huge.json', 'r') as file:
    print("File opened!")
    dicts = []
    messages = []
    counter = 0
    for line in file:
        if counter % 500 == 0:
            print("counter: ", counter)
        counter += 1
        if line.startswith('{"id":"'):
            try:
                tweet = json.loads(line[:-2])
                if tweet['doc']['data']['geo'] != {}:
                    city = find_location(tweet['doc']['includes']['places'][0]['full_name'])
                    if not city:
                        continue

                    info = {'author_id': tweet['doc']['data']['author_id'],
                            'place_id': tweet['doc']['data']['geo']['place_id'],
                            'bbox': tweet['doc']['includes']['places'][0]['geo']['bbox'],
                            'city': city[0],
                            'city_code': city[1],
                            }
                    # neglect tweets with no text or not in English
                    if len(tweet['doc']['data']['text']) < 1 or tweet['doc']['data']['lang'] != 'en':
                        continue
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
                                    
                                    doc_id, doc_rev = db.save(json.loads(json_str))
                                    print(f"Document saved with ID {doc_id}, revision {doc_rev}")
                        dicts = []
                        messages = []
            except:
                continue