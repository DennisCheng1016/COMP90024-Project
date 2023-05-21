import { Router } from "express";
import { SudoController } from "../controllers/sudo.controller";

const sudoRouter = Router();

sudoRouter.get("/liquor/analysis", SudoController.getLiquorAnalysis);
sudoRouter.get("/liquor/data/:key", SudoController.getLiquorData);
sudoRouter.get("/gambling/analysis", SudoController.getGamblingAnalysis);
sudoRouter.get("/gambling/data/:key", SudoController.getGamblingData);
sudoRouter.get("/food/analysis", SudoController.getFoodAnalysis);
sudoRouter.get("/food/data/:key", SudoController.getFoodData);

export default sudoRouter;