import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IntegrationService } from "../services/integration.service";

const getLiquorAnalysis = async (
    _: Request,
    res: Response
) => {
    try {
        const locAnalysis: IGeneralView[] = await IntegrationService.getLiquorAnalysis();
        if (locAnalysis != null) {
            return res.status(StatusCodes.OK).json(locAnalysis);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Liquor analysis not found" });
};

const getGamblingAnalysis = async(
    _: Request,
    res: Response
) => {
    try {
        const locAnalysis: IGeneralView[] = await IntegrationService.getGamblingAnalysis();
        if (locAnalysis != null) {
            return res.status(StatusCodes.OK).json(locAnalysis);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Gambling analysis not found" });
}

const getLiquorData = async(
    req: Request,
    res: Response
) => {
    try {
        const locData: IGeneralView = await IntegrationService.getLiquorData(req.params.key);
        if (locData != null) {
            return res.status(StatusCodes.OK).json(locData);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Liquor data not found" });
}

const getGamblingData = async(
    req: Request,
    res: Response
) => {
    try {
        const locData: IGeneralView = await IntegrationService.getGamblingData(req.params.key);
        if (locData != null) {
            return res.status(StatusCodes.OK).json(locData);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Gambling data not found" });
}

export const IntegrationController = { getLiquorAnalysis, getGamblingAnalysis, getLiquorData, getGamblingData };
