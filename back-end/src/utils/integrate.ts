const integrateAnalysis = (sudoAnalysis: IGeneralView[], tweetAnalysis: IGeneralView[]) => {
    const res: IGeneralView[] = [];
    sudoAnalysis.map((el) => {
        const tweetEl = tweetAnalysis.find((tweetEl) => tweetEl.key === el.key);
        res.push({ key: el.key, value: (tweetEl ? tweetEl.value : 0) / el.value });
    });
    return res;
}

export { integrateAnalysis };