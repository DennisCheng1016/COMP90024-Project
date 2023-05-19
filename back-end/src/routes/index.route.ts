import { Router } from "express";
import itemRouter from "./item.route";
import testRouter from "./test.route";

const router = Router();

router.use("/items", itemRouter);
router.use("/test", testRouter);

export default router;
