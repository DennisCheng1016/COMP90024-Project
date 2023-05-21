import { Router } from "express";
import sudoRouter from "./sudo.route";
import tweetRouter from "./tweet.route";
import integrationRouter from "./integration.route";

const router = Router();

router.use("/sudo", sudoRouter);
router.use("/tweet", tweetRouter);
router.use("/integration", integrationRouter);

export default router;
