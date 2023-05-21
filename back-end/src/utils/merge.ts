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
    return analysis;
}

export { mergeAnalysis };