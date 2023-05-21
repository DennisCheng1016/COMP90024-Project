import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TweetService } from "../services/tweet.service";

const getLiquorAnalysis = async (
    _: Request,
    res: Response
) => {
    try {
        const locAnalysis: ILocAnalysis[] = await TweetService.getLiquorAnalysis();
        if (locAnalysis != null) {
            return res.status(StatusCodes.OK).json(locAnalysis);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Liquor analysis not found" });
};

const getGamblingAnalysis = async (
    _: Request,
    res: Response
) => {
    try {
        const locAnalysis: ILocAnalysis[] = await TweetService.getGamblingAnalysis();
        if (locAnalysis != null) {
            return res.status(StatusCodes.OK).json(locAnalysis);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Gambling analysis not found" });
};

const getFoodAnalysis = async (
    _: Request,
    res: Response
) => {
    try {
        const locAnalysis: ILocAnalysis[] = await TweetService.getFoodAnalysis();
        if (locAnalysis != null) {
            return res.status(StatusCodes.OK).json(locAnalysis);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Food analysis not found" });
};

const getLiquorData = async (
    req: Request,
    res: Response
) => {
    try {
        const locData: ITweetLocData[] = await TweetService.getLiquorData(req.params.key);
        if (locData != null) {
            return res.status(StatusCodes.OK).json(locData);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Liquor data not found" });
};

const getGamblingData = async(
    req: Request,
    res: Response
) => {
    try {
        const locData: ITweetLocData[] = await TweetService.getGamblingData(req.params.key);
        if (locData != null) {
            return res.status(StatusCodes.OK).json(locData);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Gambling data not found" });
};

const getFoodData = async(
    req: Request,
    res: Response
) => {
    try {
        const locData: ITweetLocData[] = await TweetService.getFoodData(req.params.key);
        if (locData != null) {
            return res.status(StatusCodes.OK).json(locData);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Food data not found" });
};

export const TweetController = { getLiquorAnalysis, getGamblingAnalysis, getFoodAnalysis, getLiquorData, getGamblingData, getFoodData };