import { Router } from "express";
import sudoRouter from "./sudo.route";
import tweetRouter from "./tweet.route";

const router = Router();

router.use("/sudo", sudoRouter);
router.use("/tweet", tweetRouter);

export default router;
