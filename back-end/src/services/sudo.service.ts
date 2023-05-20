import { sudoGamblingClient, sudoLiquorClient } from "../couchdb";

const LIQUOR_DESIGN_DOC = "sudo-liquor-vic";
const GAMBLING_DESIGN_DOC = "sudo-gambling-vic";
const LOC_ANALYSIS_VIEW = "loc-analysis";
const LOC_DATA_VIEW = "loc-data";
const getLocLiquorAnalysis = async () => {
    const items = await sudoLiquorClient.view(LIQUOR_DESIGN_DOC, LOC_ANALYSIS_VIEW, { group: true });
    return items.rows as ILocAnalysis[];
}

const getLocGamblingAnalysis = async () => {
    const items = await sudoGamblingClient.view(GAMBLING_DESIGN_DOC, LOC_ANALYSIS_VIEW, { group: true });
    return items.rows as ILocAnalysis[];
}

const getLocLiquorData = async (key: string) => {
    const items = await sudoLiquorClient.view(LIQUOR_DESIGN_DOC, LOC_DATA_VIEW, { key });
    return items.rows as ILocData[];
}

export const SudoService = { getLocLiquorAnalysis, getLocGamblingAnalysis, getLocLiquorData };