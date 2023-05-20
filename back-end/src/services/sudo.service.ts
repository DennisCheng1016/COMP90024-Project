import { couchDBClient } from "../couchdb";
import IItem from "../interfaces/Item";

const getItemById = async (itemId: string) => {
    const item = await couchDBClient.get(itemId);
    return item as unknown as IItem;
}

const getLocAnalysis = async () => {
    const items = await couchDBClient.view("location", "loc-analysis", { group: true });
    return items.rows as ILocAnalysis[];
}

const getLocData = async (key: string) => {
    const items = await couchDBClient.view("location", "loc-data", { key });
    return items.rows as ILocData[];
}

const getTest = async (): Promise<IItem[]> => {
    const testItem: IItem[] = [
        {
            loc: "MELBOURNE",
            random: 1
        }, 
        {
            loc: "YARRA",
            random: 2000
        },
        {
            loc: "BANYULE",
            random: 3000000
        }
    ]
    return testItem;
}

export const SudoService = { getItemById, getLocAnalysis, getTest, getLocData };