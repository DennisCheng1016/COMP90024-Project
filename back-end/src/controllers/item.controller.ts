import { Request, Response } from "express";
import { ItemService } from "../services/item.service";
import { StatusCodes } from "http-status-codes";
import IItem from "../interfaces/Item";

const getItemById = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const itemId = req.params.id;
        if (itemId != null) {
            const item = await ItemService.getItemById(itemId);
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

const getItemsByView = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const item = await ItemService.getItemsByView();
        if (item != null) {
            return res.status(StatusCodes.OK).json(item);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Items not found" });
};

const getTest = async (
    req: Request,
    res: Response
): Promise<Response<any, Record<string, any>>> => {
    try {
        const items: IItem[] = await ItemService.getTest();
        console.log(items);
        if (items != null) {
            return res.status(StatusCodes.OK).json(items);
        }
    } catch (error) {
        console.log(error);
        return res.status(StatusCodes.INTERNAL_SERVER_ERROR).json({ error: "Internal server error" });
    }
    return res.status(StatusCodes.NOT_FOUND).json({ error: "Items not found" });
};

export const ItemController = { getItemById, getItemsByView, getTest };