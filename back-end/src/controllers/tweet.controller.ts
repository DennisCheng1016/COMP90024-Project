import { Request, Response } from "express";
import { StatusCodes } from "http-status-codes";
import { TweetService } from "../services/tweet.service";
import { FOOD_ANALYSIS_VIEW, FOOD_DATA_VIEW, FOOD_RATIO_VIEW, GAMBLING_ANALYSIS_VIEW, GAMBLING_DATA_VIEW, LIQUOR_ANALYSIS_VIEW, LIQUOR_DATA_VIEW } from "../constants/view";

const getLiquorAnalysis = async (
    _: Request,
    res: Response
) => {
    try {
        const locAnalysis: IGeneralView[] = await TweetService.getAnalysis(LIQUOR_ANALYSIS_VIEW);
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
        const locAnalysis: IGeneralView[] = await TweetService.getAnalysis(GAMBLING_ANALYSIS_VIEW);
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
        const locAnalysis: IGeneralView[] = await TweetService.getAnalysis(FOOD_ANALYSIS_VIEW);
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
        const locData: ITweetLocData[] = await TweetService.getData(req.params.key, LIQUOR_DATA_VIEW);
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
        const locData: ITweetLocData[] = await TweetService.getData(req.params.key, GAMBLING_DATA_VIEW);
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
        const locData: ITweetLocData[] = await TweetService.getData(req.params.key, FOOD_DATA_VIEW);
        if (locData != null) {
            return res.status(StatusCodes.OK).json(locData);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Food data not found" });
};

const getFoodRatio = async(
    _: Request,
    res: Response
) => {
    try {
        const ratio: IGeneralView[] = await TweetService.getRatio(FOOD_RATIO_VIEW);
        if (ratio != null) {
            return res.status(StatusCodes.OK).json(ratio);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Liquor ratio not found" });
};

export const TweetController = { getLiquorAnalysis, getGamblingAnalysis, getFoodAnalysis, getLiquorData, getGamblingData, getFoodData, getFoodRatio };