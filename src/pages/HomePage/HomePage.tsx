import { useState } from "react";
import { EmpiricalFunctionChart } from "../../components/Charts/EmpiricalFunctionChart/EmpiricalFunctionChart";
import { FrequencyPolygon } from "../../components/Charts/FrequencyPolygon/FrequencyPolygon";
import { NumberInput } from "../../components/Input/NumberInput/NumberInput";
import { TextInput } from "../../components/Input/TextInput/TextInput";
import { MainMenu } from "../../components/Menu/MainMenu/MainMenu";
import { DistributionTable } from "../../components/Stats/DistributionTable/DistributionTable";
import { MetricsPanel } from "../../components/Stats/MetricsPanel/MetricsPanel";
import { VariationSeries } from "../../components/Stats/VariationSeries/VariationSeries";
import "./homePage.scss";

interface StartOptions {
    mode: string;
    textOption: string;
}

export default function Home() {
    const [config, setConfig] = useState<StartOptions | null>(null);
    const [data, setData] = useState<string | null>(null);

    if (!config) {
        return <MainMenu onStart={(options) => setConfig(options)} />;
    }

    if (!data) {
        return config.mode === "numbers" ? (
            <NumberInput onSubmit={(value) => setData(value)} />
        ) : (
            <TextInput onSubmit={(value) => setData(value)} />
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
                <VariationSeries data={[]} />

                <div>
                    <DistributionTable distributionType="frequency" rows={[]} />

                    <DistributionTable
                        distributionType="relative-frequency"
                        rows={[]}
                    />

                    <DistributionTable
                        distributionType="cumulative-frequency"
                        rows={[]}
                    />

                    <DistributionTable
                        distributionType="relative-cumulative-frequency"
                        rows={[]}
                    />
                </div>

                <FrequencyPolygon data={[]} />

                <EmpiricalFunctionChart data={[]} />

                <MetricsPanel mode={0} median={0} std={0} moment={0} />
            </div>
        </div>
    );
}
