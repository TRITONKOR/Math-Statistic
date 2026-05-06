export interface DistributionData {
    value: number[];
    freq: number[];
    relFreq: number[];
    cumFreq: number[];
    relCumFreq: number[];
}

export interface Metrics {
    mode: number[]; // Мода
    median: number; // Медіана
    mean: number; // Середнє значення
    variance: number; // Дисперсія
    std: number; // Середнє квадратичне відхилення
    rawMoment: number; // Початковий момент n-го порядку
}

export interface StatisticsResult {
    variationSeries: number[];
    distribution: DistributionData;
    metrics: Metrics;
}

export type TextOption = "wordLength" | "sentenceLength" | "custom";
