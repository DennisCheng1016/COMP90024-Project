import couchdb
import json
import configparser
from mastodon import Mastodon, StreamListener

# Connect to the database
config = configparser.ConfigParser()
config.read('config.ini')

admin = config.get('couchDB', 'admin')
password = config.get('couchDB', 'password')
port = config.get('couchDB', 'port')
ip = config.get('couchDB', 'ip')
host = config.get('couchDB', 'host')
server = couchdb.Server(f'http://{admin}:{password}@{host}:{port}/')

db_name = 'mastodon_db_aus_social'

if db_name in server:
    print(f"Database {db_name} found!")
    db = server[db_name]
else:
    print(f"Database {db_name} not found!")
    db = server.create(db_name)

token = config.get('mastodon.Aus.Social', 'token')
m = Mastodon(
    access_token=token,
    api_base_url='https://aus.social'
)


class MastodonListener(StreamListener):
    def on_update(self, status):
        json_str = json.dumps(status, indent=2, sort_keys=True, default=str)
        doc_id, doc_rev = db.save(json.loads(json_str))
        print(
            f"Document saved with ID {doc_id}, revision {doc_rev}")


m.stream_public(MastodonListener())
