import { Router } from "express";
import sudoRouter from "./sudo.route";

const router = Router();

router.use("/sudo", sudoRouter);

export default router;
