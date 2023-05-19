import couchdb
import configparser
import time
from nlp import RelevanceGrader
from bs4 import BeautifulSoup

def get_docs(db, limit=100):
    result = db.view('_all_docs', limit=limit)
    return [db[row.id] for row in result]

def delete_docs(db, docs):
    for doc in docs:
        db.delete(doc)
        print(f"Document {doc['_id']} deleted")

def save_docs(db, docs):
    grader = RelevanceGrader()
    doc_list = []
    content_list = []
    for doc in docs:
        if doc['language'] != 'en':
            continue
        soup = BeautifulSoup(doc['content'], 'html.parser')
        content = soup.get_text()
        if not content or content == "" or len(content) < 1:
            continue    
        new_doc = {
            'name': doc['account']['display_name'],
            'content': content,
            'time': doc['created_at'],
        }
        doc_list.append(new_doc)
        content_list.append(content)    
    print(content_list)
    result = grader.grade(content_list)

    for i in range(len(doc_list)):
        doc_list[i]['labels'] = result[i]['labels']
        doc_list[i]['scores'] = result[i]['scores']
        doc_id, doc_rev = db.save(doc_list[i])
        print(
            f"Document saved with ID {doc_id}, revision {doc_rev}")
        
def main():
    # Connect to the database
    config = configparser.ConfigParser()
    config.read('config.ini')

    admin = config.get('couchDB', 'admin')
    password = config.get('couchDB', 'password')
    port = config.get('couchDB', 'port')
    ip = config.get('couchDB', 'ip')
    host = config.get('couchDB', 'host')
    server = couchdb.Server(f'http://{admin}:{password}@{ip}:{port}/')

    source_db = config.get('mastodon.Aus.Social', 'db_name')

    if source_db in server:
        print(f"Database {source_db} found!")
        source = server[source_db]
    else:
        print(f"Database {source_db} not found!")
        source = server.create(source_db)

    target_db = "mastodon_db_aus_social_nlp"

    if target_db in server:
        print(f"Database {target_db} found!")
        target = server[target_db]
    else:
        print(f"Database {target_db} not found!")
        target = server.create(target_db)

    while True:
        docs = get_docs(source, limit=50)
        if len(docs) == 0:
            time.sleep(10)
            continue
        save_docs(target, docs)
        delete_docs(source, docs)

if __name__ == "__main__":
    main()
    

