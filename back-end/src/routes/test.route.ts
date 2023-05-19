import express from "express";
import { ItemController } from "../controllers/item.controller";

const testRouter = express.Router();

testRouter.get("/", ItemController.getTest);

export default testRouter;