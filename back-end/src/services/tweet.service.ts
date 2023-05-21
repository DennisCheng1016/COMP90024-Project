import { tweetGmelClient, tweetVicClient } from "../couchdb";
import { mergeAnalysis, mergeRatio } from "../utils/merge";

const TWEET_VIC_DESIGN_DOC = "tweet-vic";
const TWEET_GMEL_DESIGN_DOC = "tweet-gmel";

const getAnalysis = async (viewName: string) => {
    const analysisVic = (await tweetVicClient.view(TWEET_VIC_DESIGN_DOC, viewName, { group: true })).rows as ILocAnalysis[];
    const analysisGmel = (await tweetGmelClient.view(TWEET_GMEL_DESIGN_DOC, viewName, { group: true })).rows as ILocAnalysis[];
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
    return mergeRatio(ratioVic, ratioGmel);
}

export const TweetService = { getAnalysis, getData, getRatio };