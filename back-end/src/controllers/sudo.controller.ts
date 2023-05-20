import { Request, Response } from "express";
import { SudoService } from "../services/sudo.service";
import { StatusCodes } from "http-status-codes";
import IItem from "../interfaces/Item";

const getItemById = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const itemId = req.params.id;
        if (itemId != null) {
            const item = await SudoService.getItemById(itemId);
            if (item != null) {
                return res.status(StatusCodes.OK).json(item);
            }
        } else {
            return res.status(StatusCodes.BAD_REQUEST).json({ error: "Invalid id" });
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Item not found" });
};

const getLocAnalysis = async (
    _: Request,
    res: Response
) => {
    try {
        const locAnalysis: ILocAnalysis[] = await SudoService.getLocAnalysis();
        if (locAnalysis != null) {
            return res.status(StatusCodes.OK).json(locAnalysis);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Location analysis not found" });
};

const getLocData = async (
    req: Request,
    res: Response
) => {
    try {
        const locData: ILocData[] = await SudoService.getLocData(req.params.key);
        if (locData != null) {
            return res.status(StatusCodes.OK).json(locData);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Location data not found" });
};

export const ItemController = { getItemById, getLocAnalysis, getLocData };