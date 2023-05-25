const integrateAnalysis = (sudoAnalysis: IGeneralView[], tweetAnalysis: IGeneralView[]): IGeneralView[] => {
    const tweetAnalysisMap: { [key: string]: number } = tweetAnalysis.reduce((acc, cur) => {
        acc[cur.key] = cur.value;
        return acc;
    }, {} as { [key: string]: number });

    return sudoAnalysis.map(el => {
        const tweetElValue = tweetAnalysisMap[el.key] || 0;
        return { key: el.key, value: tweetElValue / el.value };
    });
}

export { integrateAnalysis };