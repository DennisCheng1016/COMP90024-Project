import { GAMBLING_RATIO_VIEW, LIQUOR_RATIO_VIEW } from "../constants/view";
import { integrateAnalysis } from "../utils/integrate";
import { SudoService } from "./sudo.service"
import { TweetService } from "./tweet.service";

const getLiquorAnalysis = async () => {
    const sudoAnalysis: ILocAnalysis[] = await SudoService.getLiquorAnalysis();
    const tweetRatioAnalysis: ILocAnalysis[] = await TweetService.getRatio(LIQUOR_RATIO_VIEW);
    return integrateAnalysis(sudoAnalysis, tweetRatioAnalysis);
}

const getGamblingAnalysis = async () => {
    const sudoAnalysis: ILocAnalysis[] = await SudoService.getGamblingAnalysis();
    const tweetRatioAnalysis: ILocAnalysis[] = await TweetService.getRatio(GAMBLING_RATIO_VIEW);
    return integrateAnalysis(sudoAnalysis, tweetRatioAnalysis);
}

export const IntegrationService = { getLiquorAnalysis, getGamblingAnalysis };