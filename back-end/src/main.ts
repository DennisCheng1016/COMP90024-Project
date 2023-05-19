import express from "express";
import { connectToCouchDB } from "./couchdb";
import router from "./routes/index.route";
import cors from "cors";
import morgan from "morgan";

const app = express();
const port = process.env.PORT || 3000;

app.use(express.json());
app.use(express.static("public"));
app.use(cors());
app.use(morgan("dev"));
app.use("/api/", router);

connectToCouchDB()
    .then(() => {
        console.log("Connected to CouchDB");
        app.listen(port, () => {
            console.log(`Server running on port ${port}`);
        });
    })
    .catch((err) => console.log(err));
