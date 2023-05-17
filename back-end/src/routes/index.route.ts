import { Router } from "express";
import itemRouter from "./item.route";

const router = Router();

router.use("/items", itemRouter)

export default router;
