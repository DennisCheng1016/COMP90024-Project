import { couchDBClient } from "../couchdb";
import IItem from "../interfaces/Item";

const getItemById = async (itemId: string) => {
    const item = await couchDBClient.get(itemId);
    return item as unknown as IItem;
}

const getItemsByView = async () => {
    const items = couchDBClient.view("nlp", "label_alc_stats");
    return items as unknown as IItem[];
}

const getTest = async (): Promise<IItem[]> => {
    const testItem: IItem[] = [
        {
            loc: "CARLTON",
            random: 1
        }, 
        {
            loc: "PARKVILLE",
            random: 2000
        },
        {
            loc: "KENSINGTON",
            random: 3000000
        }
    ]
    return testItem;
}

export const ItemService = { getItemById, getItemsByView, getTest };