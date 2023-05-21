import geopandas as gpd
import pandas as pd
from dbfread import DBF
from shapely.geometry import shape, Point
import json
import couchdb

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

shp_file = "/Users/ayu/Desktop/unimelb_air/sem1_2023/CCC/load_sudo/sudo_shp/population/shp/dsdbi_ia_population_by_gender_lga_2006-.shp" # Population vic
data = gpd.read_file(shp_file)

df = pd.DataFrame(
    {
        "x": data["geometry"].centroid.x,
        "y": data["geometry"].centroid.y,
        # "obese_percentage": data["perc_pers0"]
        "population": data["all_person"]        
    }
)

geo_file = "vic_geo.json"
df_out = None
# df assigned above
with open(geo_file, "r") as f:
    geoJson = json.load(f)
    data_processed = list()

    batch_size = 10
    batch_count = 0

    for i in range(0, len(df), batch_size):
        batch_count += 1
        batch = df.iloc[i:i+batch_size]
        processed_batch = batch.apply(tag_zone, args=("y", "x", geoJson), axis=1)
        data_processed.append(processed_batch)
        print(f"{batch_size*(batch_count)/len(df)*100:.2f}% finished.")
    
    df_out = pd.concat(data_processed, ignore_index=True)
        
# Post-tagging process
df_out = df_out.fillna("N/A")

# output_json = df_out[["zone", "obese_percentage"]].to_dict(orient="records")
output_json = df_out[["zone", "population"]].to_dict(orient="records")

# db_name = 'sudo_obesity_tagged'
db_name = "sudo_vic_population"
# 
admin = "admin"
password = "admin"
# ip = "172.26.133.84"
ip = "115.146.93.213"
port = "5984"
server = couchdb.Server(f"http://{admin}:{password}@{ip}:{port}/")  
db = server[db_name]

for doc in output_json:
    db.save(doc)