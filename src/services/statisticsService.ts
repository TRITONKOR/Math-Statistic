import type {
    DistributionData,
    Metrics,
    StatisticsResult,
    TextOption,
} from "../types/statistics";
import {
    createEmptyDistribution,
    emptyMetrics,
    emptyResult,
} from "../utils/helper";

export function processNumbers(input: string): StatisticsResult {
    const numbers = input
        .split(/\s+/)
        .map(Number)
        .filter((n) => !isNaN(n));

    numbers.sort((a, b) => a - b);

    const distribution = createDistribution(numbers);

    const metrics = createMetrics(numbers);

    return {
        variationSeries: numbers,

        distribution,

        metrics: metrics,
    };
}

function createMetrics(data: number[]): Metrics {
    const metrics = emptyMetrics();

    if (data.length === 0) return metrics;

    const freqMap = new Map<number, number>();
    data.forEach((num) => {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    });

    // Мода
    let maxFreq = 0;
    freqMap.forEach((freq) => {
        if (freq > maxFreq) {
            maxFreq = freq;
        }
    });

    const modes = Array.from(freqMap.entries())
        .filter(([_, freq]) => freq === maxFreq)
        .map(([num]) => num);

    metrics.mode = modes;

    // Медіана
    const mid = Math.floor(data.length / 2);
    metrics.median =
        data.length % 2 === 0 ? (data[mid - 1] + data[mid]) / 2 : data[mid];

    // Математичне сподівання
    let sum = 0;
    freqMap.forEach((freq, val) => {
        sum += val * freq;
    });
    metrics.mean = sum / data.length;

    // Дисперсія та СКВ
    let varianceSum = 0;
    freqMap.forEach((freq, val) => {
        varianceSum += freq * (val - metrics.mean) ** 2;
    });
    metrics.variance = varianceSum / data.length;
    metrics.std = Math.sqrt(metrics.variance);

    // Початковий момент n-го порядку
    const momentOrder = 2;
    let momentSum = 0;
    freqMap.forEach((freq, val) => {
        momentSum += val ** momentOrder * freq;
    });
    metrics.rawMoment = momentSum / data.length;

    return metrics;
}

function createDistribution(data: number[]): DistributionData {
    const distribution: DistributionData = createEmptyDistribution();

    const freqMap = new Map<number, number>();

    data.forEach((num) => {
        freqMap.set(num, (freqMap.get(num) || 0) + 1);
    });

    distribution.cumFreq.push(0);
    distribution.relCumFreq.push(0);

    let cumFreq = 0;
    const total = data.length;

    Array.from(freqMap.entries()).forEach(([value, freq]) => {
        distribution.value.push(value);
        distribution.freq.push(freq);

        const relFreq = freq / total;
        distribution.relFreq.push(relFreq);

        cumFreq += freq;
        distribution.cumFreq.push(cumFreq);
        distribution.relCumFreq.push(cumFreq / total);
    });

    return distribution;
}

export function processText(
    input: string,
    option: TextOption,
    customValue?: string,
): StatisticsResult {
    let data: number[] = [];

    switch (option) {
        case "wordLength":
            data = input.split(/\s+/).map((w) => w.length);
            break;

        case "sentenceLength":
            data = input
                .split(/[.!?]+/)
                .filter(Boolean)
                .map((s) => s.trim().split(/\s+/).length);
            break;

        case "custom":
            if (!customValue) return emptyResult();

            const matches = input.match(new RegExp(customValue, "gi"));
            data = matches ? [matches.length] : [0];
            break;
    }

    return {
        variationSeries: data,

        distribution: createEmptyDistribution(),

        metrics: emptyMetrics(),
    };
}
