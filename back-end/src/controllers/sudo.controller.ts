import { Request, Response } from "express";
import { SudoService } from "../services/sudo.service";
import { StatusCodes } from "http-status-codes";

const getLocLiquorAnalysis = async (
    _: Request,
    res: Response
) => {
    try {
        const locAnalysis: ILocAnalysis[] = await SudoService.getLocLiquorAnalysis();
        if (locAnalysis != null) {
            return res.status(StatusCodes.OK).json(locAnalysis);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Location liquor analysis not found" });
};

const getLocGamblingAnalysis = async (
    _: Request,
    res: Response
) => {
    try {
        const locAnalysis: ILocAnalysis[] = await SudoService.getLocGamblingAnalysis();
        if (locAnalysis != null) {
            return res.status(StatusCodes.OK).json(locAnalysis);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Location gambling analysis not found" });
};

const getLocLiquorData = async (
    req: Request,
    res: Response
) => {
    try {
        const locData: ILocData[] = await SudoService.getLocLiquorData(req.params.key);
        if (locData != null) {
            return res.status(StatusCodes.OK).json(locData);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Location liquor data not found" });
};

const getLocGamblingData = async(
    req: Request,
    res: Response
) => {
    try {
        const locData: ILocData[] = await SudoService.getLocGamblingData(req.params.key);
        if (locData != null) {
            return res.status(StatusCodes.OK).json(locData);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Location gambling data not found" });
};


export const SudoController = { getLocLiquorAnalysis, getLocGamblingAnalysis, getLocLiquorData, getLocGamblingData };