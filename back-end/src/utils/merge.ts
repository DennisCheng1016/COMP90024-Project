const mergeAnalysis = (analysisVic: IGeneralView[], analysisGmel: IGeneralView[]) => {
    const analysis = [ ...analysisVic, ...analysisGmel ].reduce((result, item) => {
        const existingIndex = result.findIndex((el) => el.key === item.key);
        if (existingIndex !== -1) {
            result[existingIndex].value += item.value;
        } else {
            result.push(item);
        }
        return result;
    }, [] as IGeneralView[]);
    return analysis;
}

const mergeRatio = (ratioVic: ITweetRatio[], ratioGmel: ITweetRatio[], population: IGeneralView[]): IGeneralView[] => {
    const ratio: ITweetRatio[] = [ ...ratioVic, ...ratioGmel ].reduce((result, item) => {
        const existingIndex = result.findIndex((el) => el.key === item.key);
        if (existingIndex !== -1) {
            result[existingIndex].value.highScores += item.value.highScores;
            result[existingIndex].value.allScores += item.value.allScores;
            result[existingIndex].value.ratio = result[existingIndex].value.highScores / result[existingIndex].value.allScores;
        } else {
            result.push(item);
        }
        return result;
    }, [] as ITweetRatio[]);
    const res: IGeneralView[] = [];
    ratio.map((el) => {
        const pop: number = population.find((pop) => pop.key === el.key)?.value || 0;
        res.push({ key: el.key, value: el.value.ratio * pop });
    });
    return res;
}

export { mergeAnalysis, mergeRatio };