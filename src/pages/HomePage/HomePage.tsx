import { useState } from "react";
import { EmpiricalFunctionChart } from "../../components/Charts/EmpiricalFunctionChart/EmpiricalFunctionChart";
import { FrequencyPolygon } from "../../components/Charts/FrequencyPolygon/FrequencyPolygon";
import { NumberInput } from "../../components/Input/NumberInput/NumberInput";
import { TextInput } from "../../components/Input/TextInput/TextInput";
import { MainMenu } from "../../components/Menu/MainMenu/MainMenu";
import { DistributionTable } from "../../components/Stats/DistributionTable/DistributionTable";
import { MetricsPanel } from "../../components/Stats/MetricsPanel/MetricsPanel";
import { VariationSeries } from "../../components/Stats/VariationSeries/VariationSeries";

import { buildDistributionRows } from "../../utils/helper";

import type { StatisticsResult, TextOption } from "../../types/statistics";

import { processNumbers, processText } from "../../services/statisticsService";
import "./homePage.scss";

interface StartOptions {
    mode: "numbers" | "text";
    textOption: TextOption;
}

export default function Home() {
    const [config, setConfig] = useState<StartOptions | null>(null);
    const [data, setData] = useState<StatisticsResult | null>(null);

    const handleSubmit = (input: string, customValue?: string) => {
        if (!config) return;

        const result =
            config.mode === "numbers"
                ? processNumbers(input)
                : processText(input, config.textOption, customValue);

        setData(result);
    };

    if (!config) {
        return <MainMenu onStart={(options) => setConfig(options)} />;
    }

    if (!data) {
        return config.mode === "numbers" ? (
            <NumberInput onSubmit={handleSubmit} />
        ) : (
            <TextInput textOption={config.textOption} onSubmit={handleSubmit} />
        );
    }

    return (
        <div className="home-page">
            <div className="home-page-header">
                <h1>Результати аналізу</h1>
                <button
                    className="ui-button ui-button-ghost"
                    onClick={() => setData(null)}
                >
                    Нові дані
                </button>
            </div>

            <div className="home-page-grid">
                <VariationSeries data={data.variationSeries} />

                <div>
                    <DistributionTable
                        distributionType="frequency"
                        rows={buildDistributionRows(
                            data.distribution,
                            "frequency",
                        )}
                    />

                    <DistributionTable
                        distributionType="relative-frequency"
                        rows={buildDistributionRows(
                            data.distribution,
                            "relative-frequency",
                        )}
                    />

                    <DistributionTable
                        distributionType="cumulative-frequency"
                        rows={buildDistributionRows(
                            data.distribution,
                            "cumulative-frequency",
                        )}
                    />

                    <DistributionTable
                        distributionType="relative-cumulative-frequency"
                        rows={buildDistributionRows(
                            data.distribution,
                            "relative-cumulative-frequency",
                        )}
                    />
                </div>

                <FrequencyPolygon
                    data={data.distribution.value.map((value, i) => ({
                        value,
                        freq: data.distribution.freq[i],
                    }))}
                />

                <EmpiricalFunctionChart
                    data={data.distribution.value.map((value, i) => ({
                        value,
                        relCumFreq: data.distribution.relCumFreq[i],
                    }))}
                />

                <MetricsPanel metrics={data.metrics} />
            </div>
        </div>
    );
}
