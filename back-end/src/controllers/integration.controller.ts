import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { IntegrationService } from "../services/integration.service";

const getLiquorAnalysis = async (
    _: Request,
    res: Response
) => {
    try {
        const locAnalysis: ILocAnalysis[] = await IntegrationService.getLiquorAnalysis();
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
        const locAnalysis: ILocAnalysis[] = await IntegrationService.getGamblingAnalysis();
        if (locAnalysis != null) {
            return res.status(StatusCodes.OK).json(locAnalysis);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Gambling analysis not found" });
}

export const IntegrationController = { getLiquorAnalysis, getGamblingAnalysis };
