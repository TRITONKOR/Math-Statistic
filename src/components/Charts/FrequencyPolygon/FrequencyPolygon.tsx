import type { FC } from "react";
import {
    CartesianGrid,
    Line,
    LineChart,
    ResponsiveContainer,
    Tooltip,
    XAxis,
    YAxis,
} from "recharts";
import "./frequencyPolygon.scss";

export interface FrequencyPolygonProps {
    data: {
        value: string | number;
        freq: number;
    }[];
}

export const FrequencyPolygon: FC<FrequencyPolygonProps> = ({ data }) => {
    return (
        <div className="frequency-polygon ui-card">
            <h3>Полігон частот</h3>

            <div className="chart-shell">
                <ResponsiveContainer width="100%" height="100%">
                    <LineChart data={data}>
                        <CartesianGrid strokeDasharray="4 4" />
                        <XAxis dataKey="value" />
                        <YAxis />
                        <Tooltip />
                        <Line type="monotone" dataKey="freq" strokeWidth={3} />
                    </LineChart>
                </ResponsiveContainer>
            </div>
        </div>
    );
};
