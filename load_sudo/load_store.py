import couchdb
import configparser
import time
import json
import pandas as pd
from shapely.geometry import shape, Point

def get_zone_from_point(point, geoJson):
    for feature in geoJson["features"]:
        polygon = shape(feature["geometry"])
        if polygon.contains(point):
            return feature["properties"]["vic_lga__3"]
    return None

def tag_zone(row, lat_key, long_key, geoJson):
    lat_value = row[lat_key]
    long_value = row[long_key]
    zone = get_zone_from_point(Point(long_value, lat_value), geoJson)
    row["zone"] = zone
    return row

def process_geo_and_save_docs(db, sudo_file, geo_file, lat_key, long_key, batch_size = 10):
    # i.e. geo_file = ‘vic_geo.json’
    with open(sudo_file, 'r') as f_sudo, open(geo_file, 'r') as f_map:
        df = pd.read_csv(f_sudo)
        df = df.rename(columns=lambda x: x.strip())
        geoJson = json.load(f_map)

        data_processed = list()

        
        batch_count = 0
        # for i in range(0, batch_size*2, batch_size):
        for i in range(0, len(df), batch_size):
            batch_count += 1
            batch = df.iloc[i:i+batch_size]
            processed_batch = batch.apply(tag_zone, args=(lat_key, long_key, geoJson), axis=1)
            data_processed.append(processed_batch)
            print(f"{batch_size*(batch_count)/len(df)*100:.2f}% finished.")
        
        df_processed = pd.concat(data_processed, ignore_index=True)
        
        # Post-tagging process
        df_processed = df_processed.fillna("N/A")
        return df_processed
        
        
def main():
    # Change below
    sudo_file = "/Users/ayu/Desktop/unimelb_air/sem1_2023/CCC/load_sudo/vcglr_egm_venue_expenditure.csv"
    lat_key = "lat"
    long_key = "long"
    db_name = 'sudo_gamble_vic_tagged'

    admin = "admin"
    password = "123456"
    ip = "172.26.133.84"
    port = "5984"
    server = couchdb.Server(f"http://{admin}:{password}@{ip}:{port}/")  
    
    # sudo_file = "/Users/ayu/Desktop/unimelb_air/sem1_2023/CCC/load_sudo/vcglr_liquor_licences.csv"
    geo_file = "vic_geo.json"

    db = server[db_name]


    df_processed = process_geo_and_save_docs(db, sudo_file, geo_file, lat_key, long_key)

    data_dict = df_processed.to_dict(orient="records")

    print("data_dict: ", data_dict)

    doc_counter = 0
    percentage_count = 0
    for doc in data_dict:
        doc_counter += 1
        if doc_counter/len(data_dict) >= len(data_dict)/100:
            percentage_count += 1
            doc_counter = 0
            print(f"{percentage_count:.2f}% Saved to database.")
        db.save(doc)
    
        
if __name__ == "__main__":
    main()

