import json

with open('twitter-huge.json', 'r') as file:
    for line in file:
        if line.startswith('{"id":"'):
            try:
                tweet = json.loads(line[:-2])
                if tweet['doc']['data']['geo'] != {}:
                    print("author_id: ", tweet['doc']['data']['author_id'])
                    print("place_id: ", tweet['doc']['data']['geo']['place_id'])
                    print("bbox: ", tweet['doc']['includes']['places'][0]['geo']['bbox'])
                    print("text: ", tweet['doc']['data']['text'], "\n")
            except:
                continue
