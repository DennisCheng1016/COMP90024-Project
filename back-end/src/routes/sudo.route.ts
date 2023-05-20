import express from "express";
import { SudoController } from "../controllers/sudo.controller";

const sudoRouter = express.Router();

sudoRouter.get("/liquor/loc-analysis", SudoController.getLocLiquorAnalysis);
sudoRouter.get("/liquor/loc-data/:key", SudoController.getLocLiquorData);

export default sudoRouter;