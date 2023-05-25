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
    const ratioMap: { [key: string]: ITweetRatio } = {};

    [ ...ratioVic, ...ratioGmel ].forEach(item => {
        if (ratioMap[item.key]) {
            ratioMap[item.key] = {
                key: item.key,
                value: {
                    highScores: ratioMap[item.key].value.highScores + item.value.highScores,
                    allScores: ratioMap[item.key].value.allScores + item.value.allScores,
                    ratio: 0 // initial value, will be updated later
                }
            };
            ratioMap[item.key].value.ratio = ratioMap[item.key].value.highScores / ratioMap[item.key].value.allScores;
        } else {
            ratioMap[item.key] = item;
        }
    });

    const populationMap = population.reduce((acc, cur) => {
        acc[cur.key] = cur.value;
        return acc;
    }, {} as { [key: string]: number });

    return Object.values(ratioMap).map(el => ({
        key: el.key,
        value: (populationMap[el.key] || 0) * el.value.ratio
    }));
}


export { mergeAnalysis, mergeRatio };