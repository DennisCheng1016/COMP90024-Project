import { Router } from "express";
import { IntegrationController } from "../controllers/integration.controller";
const integrationRouter = Router();

integrationRouter.get("/liquor/analysis", IntegrationController.getLiquorAnalysis);
integrationRouter.get("/gambling/analysis", IntegrationController.getGamblingAnalysis);

export default integrationRouter;