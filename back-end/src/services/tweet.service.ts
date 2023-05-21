import { tweetVicClient } from "../couchdb";

const TWEET_DESIGN_DOC = "tweet-vic";
const LIQUOR_ANALYSIS_VIEW = "liquor-analysis";
const LIQUOR_DATA_VIEW = "liquor-data";
const GAMBLING_ANALYSIS_VIEW = "gambling-analysis";
const GAMBLING_DATA_VIEW = "gambling-data";
const FOOD_ANALYSIS_VIEW = "food-analysis";
const FOOD_DATA_VIEW = "food-data";

const getLiquorAnalysis = async () => {
    const analysis = await tweetVicClient.view(TWEET_DESIGN_DOC, LIQUOR_ANALYSIS_VIEW, { group: true });
    return analysis.rows as ILocAnalysis[];
}

const getGamblingAnalysis = async () => {
    const analysis = await tweetVicClient.view(TWEET_DESIGN_DOC, GAMBLING_ANALYSIS_VIEW, { group: true });
    return analysis.rows as ILocAnalysis[];
}

const getFoodAnalysis = async () => {
    const analysis = await tweetVicClient.view(TWEET_DESIGN_DOC, FOOD_ANALYSIS_VIEW, { group: true });
    return analysis.rows as ILocAnalysis[];
}

const getLiquorData = async (key: string) => {
    const data = await tweetVicClient.view(TWEET_DESIGN_DOC, LIQUOR_DATA_VIEW, { key });
    return data.rows as ITweetLocData[];
}

const getGamblingData = async (key: string) => {
    const data = await tweetVicClient.view(TWEET_DESIGN_DOC, GAMBLING_DATA_VIEW, { key });
    return data.rows as ITweetLocData[];
}

const getFoodData = async (key: string) => {
    const data = await tweetVicClient.view(TWEET_DESIGN_DOC, FOOD_DATA_VIEW, { key });
    return data.rows as ITweetLocData[];
}

export const TweetService = { getLiquorAnalysis, getGamblingAnalysis, getFoodAnalysis, getLiquorData, getGamblingData, getFoodData };