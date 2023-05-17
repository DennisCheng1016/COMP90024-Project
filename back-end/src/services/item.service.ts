import { couchDBClient } from "../couchdb";

const MY_VIEW = "items";
const getItemById = async (itemId: string) => {
    const item = await couchDBClient.get(itemId);
    return item as unknown as IItem;
}

const getItemsByView = async () => {
    const items = couchDBClient.view(MY_VIEW, "items")
    return items as unknown as IItem[];
}

export const ItemService = { getItemById, getItemsByView };