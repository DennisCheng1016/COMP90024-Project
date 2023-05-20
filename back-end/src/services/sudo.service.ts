import { sudoGamblingClient, sudoLiquorClient } from "../couchdb";

const LIQUOR_DESIGN_DOC = "sudo-liquor-vic";
const GAMBLING_DESIGN_DOC = "sudo-gambling-vic";
const LOC_ANALYSIS_VIEW = "loc-analysis";
const LOC_DATA_VIEW = "loc-data";
const getLocLiquorAnalysis = async () => {
    const analysis = await sudoLiquorClient.view(LIQUOR_DESIGN_DOC, LOC_ANALYSIS_VIEW, { group: true });
    return analysis.rows as ILocAnalysis[];
}

const getLocGamblingAnalysis = async () => {
    const analysis = await sudoGamblingClient.view(GAMBLING_DESIGN_DOC, LOC_ANALYSIS_VIEW, { group: true });
    return analysis.rows as ILocAnalysis[];
}

const getLocLiquorData = async (key: string) => {
    const data = await sudoLiquorClient.view(LIQUOR_DESIGN_DOC, LOC_DATA_VIEW, { key });
    return data.rows as ISudoLocData[];
}

const getLocGamblingData = async (key: string) => {
    const data = await sudoGamblingClient.view(GAMBLING_DESIGN_DOC, LOC_DATA_VIEW, { key });
    return data.rows as ISudoLocData[];
}

export const SudoService = { getLocLiquorAnalysis, getLocGamblingAnalysis, getLocLiquorData, getLocGamblingData };