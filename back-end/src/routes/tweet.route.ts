import express from "express";
import { TweetController } from "../controllers/tweet.controller";

const tweetRouter = express.Router();

tweetRouter.get("/liquor/analysis", TweetController.getLiquorAnalysis);
tweetRouter.get("/liquor/data/:key", TweetController.getLiquorData);
tweetRouter.get("/gambling/analysis", TweetController.getGamblingAnalysis);
tweetRouter.get("/gambling/data/:key", TweetController.getGamblingData);

export default tweetRouter;