import { populationClient, tweetGmelClient, tweetVicClient } from "../couchdb";
import { mergeAnalysis, mergeRatio } from "../utils/merge";

const TWEET_VIC_DESIGN_DOC = "tweet-vic";
const TWEET_GMEL_DESIGN_DOC = "tweet-gmel";
const POPULATION_DESIGN_DOC = "population-vic";
const POPULATION_VIEW = "population-view";

const getAnalysis = async (viewName: string) => {
    const analysisVic = (await tweetVicClient.view(TWEET_VIC_DESIGN_DOC, viewName, { group: true })).rows as IGeneralView[];
    const analysisGmel = (await tweetGmelClient.view(TWEET_GMEL_DESIGN_DOC, viewName, { group: true })).rows as IGeneralView[];
    return mergeAnalysis(analysisVic, analysisGmel);
}

const getData = async (key: string, viewName: string) => {
    const dataVic = (await tweetVicClient.view(TWEET_VIC_DESIGN_DOC, viewName, { key })).rows as ITweetLocData[];
    const dataGmel = (await tweetGmelClient.view(TWEET_GMEL_DESIGN_DOC, viewName, { key })).rows as ITweetLocData[];
    return dataVic.concat(dataGmel);
}

const getRatio = async (viewName: string) => {
    const ratioVic = (await tweetVicClient.view(TWEET_VIC_DESIGN_DOC, viewName, { group: true })).rows as ITweetRatio[];
    const ratioGmel = (await tweetGmelClient.view(TWEET_GMEL_DESIGN_DOC, viewName, { group: true })).rows as ITweetRatio[];
    const population = (await populationClient.view(POPULATION_DESIGN_DOC, POPULATION_VIEW)).rows as IGeneralView[];
    return mergeRatio(ratioVic, ratioGmel, population);
}

export const TweetService = { getAnalysis, getData, getRatio };