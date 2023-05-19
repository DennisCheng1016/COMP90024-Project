import express from "express";
import { ItemController } from "../controllers/item.controller";

const testRouter = express.Router();

testRouter.get("/test", ItemController.getTest);

export default testRouter;