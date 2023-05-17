import { couchDBClient } from "../couchdb";

const getItemById = async (itemId: string) => {
    const item = await couchDBClient.get(itemId);
    return item as unknown as IItem;
}

const getItemsByView = async () => {
    const items = couchDBClient.view("test", "test-view")
    return items as unknown as IItem[];
}

export const ItemService = { getItemById, getItemsByView };