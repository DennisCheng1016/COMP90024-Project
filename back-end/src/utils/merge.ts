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

const handleData = (data: ILocAnalysis[]) => {
    const value: number = data.find((el) => el.key === "MELBOURNE")?.value || 0;
    return data
        .concat([{ key: "YARRA", value }, { key: "PORT PHILLIP", value }, { key: "MARIBYRNONG", value }, { key: "MORELAND", value }, { key: "STONNINGTON", value }, { key: "DAREBIN", value }]);
}

export { mergeAnalysis };