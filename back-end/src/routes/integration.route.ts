import { Router } from "express";
import { IntegrationController } from "../controllers/integration.controller";
const integrationRouter = Router();

integrationRouter.get("/liquor/analysis", IntegrationController.getLiquorAnalysis);
integrationRouter.get("/liquor/data/:key", IntegrationController.getLiquorData);
integrationRouter.get("/gambling/analysis", IntegrationController.getGamblingAnalysis);
integrationRouter.get("/gambling/data/:key", IntegrationController.getGamblingData);

export default integrationRouter;