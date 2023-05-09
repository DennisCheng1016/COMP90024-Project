import json
import pandas as pd
import couchdb
import sys

def row_to_dict(row):
    row_dict = row.to_dict()
    output = {key.strip(): value for key, value in row_dict.items()}
    return output


if __name__ == '__main__':
    config_path = sys.argv[1]
    
    # Load config and target sudo data
    
    config_dict = None
    with open(config_path, 'r') as f:
        config_dict = json.load(f)

    # Database connection
    db_user = config_dict["db_user"]
    db_pw = config_dict["db_pw"]
    ip = config_dict["ip"]
    port = config_dict["port"]

    conn_str = f'http://{db_user}:{db_pw}@{ip}:{port}/'
    server_dict = couchdb.Server(conn_str)
    
    transaction_list = [db_csv_pair for db_csv_pair in config_dict["content"]]

    for db_csv_pair in transaction_list:
        db_name = db_csv_pair["db_name"]
        csv_path = db_csv_pair["csv_path"]
        
        df_csv = None
        with open(csv_path, 'r') as f:
            df_csv = pd.read_csv(f)
            df_csv.fillna("N/A", inplace=True)

        if db_name in server_dict:
            print(f"Database {db_name} loaded alr!")
            # db = server_dict[db_name]
        else:
            print(f"Database {db_name} not found!")
            db = server_dict.create(db_name)

            print(f"Start saving corresponding csv in {db_name} (CouchDB database)")
            json_arr = [row for row in df_csv.apply(row_to_dict, axis=1)]
            for j in json_arr:
                json_str = json.dumps(j, indent=2)
                doc_id, doc_rev = db.save(json.loads(json_str))
            
            print(f"Transaction to {db_name} completed.")
