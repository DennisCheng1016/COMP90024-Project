const mergeAnalysis = (analysisVic: ILocAnalysis[], analysisGmel: ILocAnalysis[]) => {
    const analysis = [...analysisVic, ...analysisGmel].reduce((result, item) => {
        const existingIndex = result.findIndex((el) => el.key === item.key);
        if (existingIndex !== -1) {
            result[existingIndex].value += item.value;
        } else {
            result.push(item);
        }
        return result;
    }, [] as ILocAnalysis[]);
    return handleData(analysis);
}

const mergeRatio = (ratioVic: ITweetRatio[], ratioGmel: ITweetRatio[]): ILocAnalysis[] => {
    const ratio: ITweetRatio[] = [...ratioVic, ...ratioGmel].reduce((result, item) => {
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
    const res: ILocAnalysis[] = [];
    ratio.map((el) => {
        res.push({ key: el.key, value: el.value.ratio });
    });
    return res;
}

const handleData = (data: ILocAnalysis[]) => {
    const value: number = data.find((el) => el.key === "MELBOURNE")?.value || 0;
    return data
        .concat([{ key: "YARRA", value }, { key: "PORT PHILLIP", value }, { key: "MARIBYRNONG", value }, { key: "MORELAND", value }, { key: "STONNINGTON", value }, { key: "DAREBIN", value }, { key: "MOONEE VALLEY", value }, { key: "BANYULE", value }, { key: "BOROONDARA", value }]);
}

export { mergeAnalysis, mergeRatio };