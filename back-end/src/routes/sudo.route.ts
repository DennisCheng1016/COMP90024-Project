import express from "express";
import { SudoController } from "../controllers/sudo.controller";

const sudoRouter = express.Router();

sudoRouter.get("/liquor/loc-analysis", SudoController.getLocLiquorAnalysis);
sudoRouter.get("/liquor/loc-data/:key", SudoController.getLocLiquorData);
sudoRouter.get("/gambling/loc-analysis", SudoController.getLocGamblingAnalysis);
sudoRouter.get("/gambling/loc-data/:key", SudoController.getLocGamblingData);

export default sudoRouter;