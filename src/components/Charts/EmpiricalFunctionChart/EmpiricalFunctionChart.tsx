import type { FC } from "react";
import { Line, LineChart, ResponsiveContainer, XAxis, YAxis } from "recharts";
import "./empiricalFunctionChart.scss";

export interface EmpiricalFunctionChartProps {
    data: {
        value: string | number;
        relCumFreq: number;
    }[];
}

export const EmpiricalFunctionChart: FC<EmpiricalFunctionChartProps> = ({
    data,
}) => {
    return (
        <div className="empirical-function ui-card">
            <h3>Емпірична функція розподілу</h3>

            <div className="chart-shell">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <XAxis dataKey="value" />
                        <YAxis />
                        <Line
                            type="stepAfter"
                            dataKey="relCumFreq"
                            strokeWidth={3}
                        />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
