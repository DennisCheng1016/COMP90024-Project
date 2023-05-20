import express from "express";
import { ItemController } from "../controllers/sudo.controller";

const sudoRouter = express.Router();

//itemRouter.get("/:id", ItemController.getItemById);
sudoRouter.get("/loc-analysis", ItemController.getLocAnalysis);
sudoRouter.get("/loc-data/:key", ItemController.getLocData);

export default sudoRouter;