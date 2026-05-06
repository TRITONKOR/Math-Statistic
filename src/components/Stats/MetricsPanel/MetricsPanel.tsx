import type { FC } from "react";
import "./metricsPanel.scss";

export interface MetricsPanelProps {
    mode: number;
    median: number;
    std: number;
    moment: number;
}

export const MetricsPanel: FC<MetricsPanelProps> = ({
    mode,
    median,
    std,
    moment,
}) => {
    return (
        <div className="metrics-panel ui-card">
            <h3>Характеристики</h3>

            <div className="metrics-panel__grid">
                <p>
                    <span>Мода</span>
                    <strong>{mode}</strong>
                </p>
                <p>
                    <span>Медіана</span>
                    <strong>{median}</strong>
                </p>
                <p>
                    <span>СКВ</span>
                    <strong>{std}</strong>
                </p>
                <p>
                    <span>Початковий момент</span>
                    <strong>{moment}</strong>
                </p>
            </div>
        </div>
    );
};
