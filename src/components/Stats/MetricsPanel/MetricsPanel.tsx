import type { FC } from "react";
import type { Metrics } from "../../../types/statistics";
import "./metricsPanel.scss";

export interface MetricsPanelProps {
    metrics: Metrics;
}

export const MetricsPanel: FC<MetricsPanelProps> = ({ metrics }) => {
    return (
        <div className="metrics-panel ui-card">
            <h3>Характеристики</h3>

            <div className="metrics-panel__grid">
                <p>
                    <span>Мода</span>
                    <strong>{metrics.mode.join(", ")}</strong>
                </p>
                <p>
                    <span>Медіана</span>
                    <strong>{metrics.median}</strong>
                </p>
                <p>
                    <span>Математичне сподівання</span>
                    <strong>{metrics.mean}</strong>
                </p>
                <p>
                    <span>Дисперсія</span>
                    <strong>{metrics.variance}</strong>
                </p>
                <p>
                    <span>СКВ</span>
                    <strong>{metrics.std}</strong>
                </p>
                <p>
                    <span>Початковий момент</span>
                    <strong>{metrics.rawMoment}</strong>
                </p>
            </div>
        </div>
    );
};
