const integrateAnalysis = (sudoAnalysis: ILocAnalysis[], tweetAnalysis: ILocAnalysis[]) => {
    const res: ILocAnalysis[] = [];
    sudoAnalysis.map((el) => {
        const tweetEl = tweetAnalysis.find((tweetEl) => tweetEl.key === el.key);
        res.push({ key: el.key, value: (tweetEl ? tweetEl.value * 100 : 0) / el.value });
    });
    return res;
}

export { integrateAnalysis };