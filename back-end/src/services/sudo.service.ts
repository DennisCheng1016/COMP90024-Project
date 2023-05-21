import { sudoFoodClient, sudoGamblingClient, sudoLiquorClient } from "../couchdb";

const LIQUOR_DESIGN_DOC = "sudo-liquor-vic";
const GAMBLING_DESIGN_DOC = "sudo-gambling-vic";
const FOOD_DESIGN_DOC = "sudo-food-vic";
const LOC_ANALYSIS_VIEW = "loc-analysis";
const LOC_DATA_VIEW = "loc-data";
const getLiquorAnalysis = async () => {
    const analysis = await sudoLiquorClient.view(LIQUOR_DESIGN_DOC, LOC_ANALYSIS_VIEW, { group: true });
    return analysis.rows as IGeneralView[];
}

const getGamblingAnalysis = async () => {
    const analysis = await sudoGamblingClient.view(GAMBLING_DESIGN_DOC, LOC_ANALYSIS_VIEW, { group: true });
    return analysis.rows as IGeneralView[];
}

const getFoodAnalysis = async () => {
    const analysis = await sudoFoodClient.view(FOOD_DESIGN_DOC, LOC_ANALYSIS_VIEW);
    return analysis.rows as IGeneralView[];
}

const getLiquorData = async (key: string) => {
    const data = await sudoLiquorClient.view(LIQUOR_DESIGN_DOC, LOC_DATA_VIEW, { key });
    return data.rows as ISudoLocData[];
}

const getGamblingData = async (key: string) => {
    const data = await sudoGamblingClient.view(GAMBLING_DESIGN_DOC, LOC_DATA_VIEW, { key });
    return data.rows as ISudoLocData[];
}

const getFoodData = async (key: string) => {
    const data = await sudoFoodClient.view(FOOD_DESIGN_DOC, LOC_DATA_VIEW, { key });
    return data.rows as ISudoFoodData[];
}

export const SudoService = { getLiquorAnalysis, getGamblingAnalysis, getFoodAnalysis, getLiquorData, getGamblingData, getFoodData };