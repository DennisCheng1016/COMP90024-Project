# Cluster & Cloud Computing Project - Group 47

## Team Members:

Ho-Yu Cheng 1063950  
TBD

## Video links

### Ansible

TBD

### Frontend

[TweetMap](http://115.146.94.76:8060/)

### PPT

TBD

## Project Structure

### FrontEnd

1. React (8060) (Tweet Map)
2. Python-Dash (8050) (Mastodon Stream)

### BackEnd

1. Node.js (3000)
2. CouchDB related interface
3. Object Storage interface
4. Data query interface
5. Interface joint debugging

### Mastodon Harvest

1. Apply for the Mastodon Harvester API
2. Run the python script continuously
   1. Grab data
   2. Clean data
   3. NLP
   4. Save data into CouchDB

### Tweet Data Processing

1. Run the python script continuously
   1. Grab data (Only Melbourne)
   2. Clean data
   3. NLP
   4. GeoTagging processing
   5. Save data into CouchDB

### Natural Language Processing

TBD

### SUDO

### Cluster CouchDB

1. Manually set up 3 nodes cluster couchDB via docker across 3 instances on MRC

### Deployment Operation

1. Create an instance via MRC dashboard including security group, etc.
2. SSH to the instance
   1. git clone this repo
   2. `cd /path/to/repo`
   3. `chmod +x run.sh`
   4. `./run.sh` -> set up the env and install docker
   5. We can deploy frontend, backend, mastodon harvester or add/delete the node for current cluster couchDB
      - Deploy Frontend -> it will deploy _TweetMap_ with port _8060_ and _MastodonDashboard_ with port _8050_
        1. `cd front-end`
        2. `sudo docker-compose up`
      - Deploy Backend -> it will deploy backend with port _3000_
        1. `cd back-end`
        2. `sudo docker-compose up`
      - Deploy Mastodon Harvesters
        1. `cd mastodon`
        2. `sudo docker-compose up`  
           It will deploy two Mastodon client harvesters listening _Aus.Social_ and _Mastodon Australia_ respectively and perform nlp to process the data, then store into couchDB.  
           We can scale more Mastodon client harvesters by changing the `/path/to/repo/mastodon/setup-harvest.yaml` scale parameters
      - Add/Delete the cluster CouchDB node (make sure add security group for port 5984, 4396, 9100-9200)
        1. `cd couchdb`
        2. `sudo ansible-playbook -c local add_node_couchdb.yml` -> add a node on current instance to the cluster CouchDB
        3. `sudo ansible-playbook -c local delete_node_couchdb.yml` -> delete an existing node running on the current instance from the cluster CouchDB

### Current Server Arrangement

Server1: 115.146.94.76

    CouchDB/ couchdb:3.2.1
    Frontend/

Server2: 45.113.235.62

    CouchDB/ couchdb:3.2.1
    Backend/

Server3: 115.146.93.213

    CouchDB/couchdb:3.2.1

Server4: 45.113.232.69

    Mastodon Harvester
        - aus_nlp_stream
        - aus_social_nlp_stream

Server5: 172.26.130.208

    Tweets processing
