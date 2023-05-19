import express from "express";
import { ItemController } from "../controllers/item.controller";

const itemRouter = express.Router();

//itemRouter.get("/:id", ItemController.getItemById);
//itemRouter.get("/", ItemController.getItemsByView);
itemRouter.get("/test", ItemController.getTest);

export default itemRouter;