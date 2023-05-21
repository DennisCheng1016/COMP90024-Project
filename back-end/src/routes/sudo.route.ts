import express from "express";
import { SudoController } from "../controllers/sudo.controller";

const sudoRouter = express.Router();

sudoRouter.get("/liquor/analysis", SudoController.getLiquorAnalysis);
sudoRouter.get("/liquor/data/:key", SudoController.getLiquorData);
sudoRouter.get("/gambling/analysis", SudoController.getGamblingAnalysis);
sudoRouter.get("/gambling/data/:key", SudoController.getGamblingData);

export default sudoRouter;