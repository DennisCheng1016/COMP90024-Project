import Nano from "nano";
import dotenv from "dotenv";
dotenv.config();

const sudoLiquorDBName = process.env.SUDO_LIQUOR_DATABASE_NAME || "";
const sudoGamblingDBName = process.env.SUDO_GAMBLING_DATABASE_NAME || "";
const sudoFoodDBName = process.env.SUDO_FOOD_DATABASE_NAME || "";
const tweetVicDBName = process.env.TWEET_VIC_DATABASE_NAME || "";
const tweetGmelDBName = process.env.TWEET_GMEL_DATABASE_NAME || "";
const populationDBName = process.env.POPULATION_DATABASE_NAME || "";
const url = process.env.COUCHDB_KEY || "";
let sudoLiquorClient: Nano.DocumentScope<unknown>;
let sudoGamblingClient: Nano.DocumentScope<unknown>;
let sudoFoodClient: Nano.DocumentScope<unknown>;
let tweetVicClient: Nano.DocumentScope<unknown>;
let tweetGmelClient: Nano.DocumentScope<unknown>;
let populationClient: Nano.DocumentScope<unknown>;
const connectToCouchDB = async () => {
    const nano = Nano(url);
    try {
        sudoLiquorClient = nano.db.use(sudoLiquorDBName);
        sudoGamblingClient = nano.db.use(sudoGamblingDBName);
        sudoFoodClient = nano.db.use(sudoFoodDBName);
        tweetVicClient = nano.db.use(tweetVicDBName);
        tweetGmelClient = nano.db.use(tweetGmelDBName);
        populationClient = nano.db.use(populationDBName);
        await sudoLiquorClient.info();
    } catch (err) {
        console.error("Error connecting to CouchDB:", err);
    }
}

export { connectToCouchDB, sudoLiquorClient, sudoGamblingClient, sudoFoodClient, tweetVicClient, tweetGmelClient, populationClient };
