import couchdb
import json
import configparser
from mastodon import Mastodon, StreamListener
from nlp import RelevanceGrader
from bs4 import BeautifulSoup


def save_docs(db, docs, grader):
    doc_list = []
    content_list = []
    for doc in docs:
        if doc["language"] != "en":
            continue
        soup = BeautifulSoup(doc["content"], "html.parser")
        content = soup.get_text()
        if not content or content == "" or len(content) < 1:
            continue
        new_doc = {
            "_id": str(doc["id"]),  # Assign 'id' of doc to '_id' of CouchDB doc
            "name": doc["account"]["display_name"],
            "content": content,
            "time": doc["created_at"],
        }
        doc_list.append(new_doc)
        content_list.append(content)
    result = grader.grade(content_list)

    for i in range(len(doc_list)):
        doc_list[i]["labels"] = result[i]["labels"]
        doc_list[i]["scores"] = result[i]["scores"]
        doc_id = doc_list[i]["_id"]
        try:
            # Try to fetch the document
            db[str(doc_id)]
            print(f"Document with ID {doc_id} already exists, skipping.")
        except couchdb.http.ResourceNotFound:
            # If document does not exist, save it
            doc_id, doc_rev = db.save(doc_list[i])
            print(f"Document saved with ID {doc_id}, revision {doc_rev}")
            print(doc_list[i])


class MastodonListener(StreamListener):
    def __init__(self, db):
        self.db = db
        self.docs = []
        self.grader = RelevanceGrader()

    def on_update(self, status):
        json_str = json.dumps(status, indent=2, sort_keys=True, default=str)
        self.docs.append(json.loads(json_str))
        if len(self.docs) >= 10:
            save_docs(self.db, self.docs, self.grader)
            self.docs.clear()


def main():
    # read config file
    config = configparser.ConfigParser()
    config.read("config.ini")

    # Connect to the database
    admin = config.get("couchDB", "admin")
    password = config.get("couchDB", "password")
    port = config.get("couchDB", "port")
    ip = config.get("couchDB", "ip")
    host = config.get("couchDB", "host")
    server = couchdb.Server(f"http://{admin}:{password}@{ip}:{port}/")
    db_name = config.get("mastodon.Aus.Social", "db_name")
    if db_name in server:
        print(f"Database {db_name} found!")
        db = server[db_name]
    else:
        print(f"Database {db_name} not found!")
        db = server.create(db_name)

    # Connect to mastodon
    token = config.get("mastodon.Aus.Social", "token")
    m = Mastodon(access_token=token, api_base_url="https://aus.social")

    # Start streaming
    listener = MastodonListener(db)
    m.stream_public(listener)


if __name__ == "__main__":
    main()
