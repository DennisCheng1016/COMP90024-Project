import { GAMBLING_RATIO_VIEW, LIQUOR_RATIO_VIEW } from "../constants/view";
import { integrateAnalysis } from "../utils/integrate";
import { SudoService } from "./sudo.service"
import { TweetService } from "./tweet.service";

const getLiquorAnalysis = async () => {
    const sudoAnalysis: IGeneralView[] = await SudoService.getLiquorAnalysis();
    const tweetRatioAnalysis: IGeneralView[] = await TweetService.getRatio(LIQUOR_RATIO_VIEW);
    return integrateAnalysis(sudoAnalysis, tweetRatioAnalysis);
}

const getLiquorData = async (loc: string) => {
    return (await getLiquorAnalysis().then((res) => {
        return res.find((el) => el.key === loc);
    })) as IGeneralView;
}
const getGamblingAnalysis = async () => {
    const sudoAnalysis: IGeneralView[] = await SudoService.getGamblingAnalysis();
    const tweetRatioAnalysis: IGeneralView[] = await TweetService.getRatio(GAMBLING_RATIO_VIEW);
    return integrateAnalysis(sudoAnalysis, tweetRatioAnalysis);
}

const getGamblingData = async (loc: string) => {
    return (await getGamblingAnalysis().then((res) => {
        return res.find((el) => el.key === loc);
    })) as IGeneralView;
}

export const IntegrationService = { getLiquorAnalysis, getGamblingAnalysis, getLiquorData, getGamblingData };