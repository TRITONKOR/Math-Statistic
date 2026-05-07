import type {
    DistributionTableRow,
    DistributionType,
} from "../components/Stats/DistributionTable/DistributionTable";
import type {
    DistributionData,
    Metrics,
    StatisticsResult,
} from "../types/statistics";

export function createEmptyDistribution(): DistributionData {
    return {
        value: [],
        freq: [],
        relFreq: [],
        cumFreq: [],
        relCumFreq: [],
    };
}

export function emptyMetrics(): Metrics {
    return {
        mode: [],
        median: 0,
        mean: 0,
        variance: 0,
        std: 0,
        rawMoment: 0,
    };
}

export function emptyResult(): StatisticsResult {
    return {
        variationSeries: [],
        distribution: createEmptyDistribution(),
        metrics: emptyMetrics(),
    };
}

export function buildDistributionRows(
    dist: DistributionData,
    type: DistributionType,
): DistributionTableRow[] {
    let metrics: number[] = [];

    switch (type) {
        case "frequency":
            metrics = dist.freq;
            break;
        case "relative-frequency":
            metrics = dist.relFreq;
            break;
        case "cumulative-frequency":
            metrics = dist.cumFreq;
            break;
        case "relative-cumulative-frequency":
            metrics = dist.relCumFreq;
            break;
    }

    return dist.value.map((value, i) => ({
        value,
        metric: metrics[i],
    }));
}
