import Nano from "nano";
import dotenv from "dotenv";
dotenv.config();

const dbName = process.env.DATABASE_NAME || "";
const url = process.env.COUCHDB_KEY || "";
let couchDBClient: Nano.DocumentScope<unknown>;
const connectToCouchDB = async () => {
    const nano = Nano(url);
    try {
        couchDBClient = nano.db.use(dbName);
        await couchDBClient.info();
    } catch (err) {
        console.error("Error connecting to CouchDB:", err);
    }
}


export {connectToCouchDB, couchDBClient};
