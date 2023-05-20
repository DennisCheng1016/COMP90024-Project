import { couchDBClient } from "../couchdb";

const getLocLiquorAnalysis = async () => {
    const items = await couchDBClient.view("sodu-liquor-vic", "loc-analysis", { group: true });
    return items.rows as ILocAnalysis[];
}

const getLocLiquorData = async (key: string) => {
    const items = await couchDBClient.view("sodu-liquor-vic", "loc-data", { key });
    return items.rows as ILocData[];
}

export const SudoService = { getLocLiquorAnalysis, getLocLiquorData };