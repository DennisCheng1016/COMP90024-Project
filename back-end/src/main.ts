import express from "express";
import { connectToCouchDB } from "./couchdb";
import router from "./routes/index.route";

const app = express();
const port = process.env.PORT || 3000;

app.use("/api/", router);

connectToCouchDB()
    .then(() => {
        console.log("Connected to CouchDB");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => console.log(err));
