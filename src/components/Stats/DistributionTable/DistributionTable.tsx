import { type FC } from "react";
import "./distributionTable.scss";

export type DistributionType =
    | "frequency"
    | "relative-frequency"
    | "cumulative-frequency"
    | "relative-cumulative-frequency";

export interface DistributionTableRow {
    value: string | number;
    metric: string | number;
}

export interface DistributionTableProps {
    distributionType: DistributionType;
    rows: DistributionTableRow[];
    title?: string;
}

const distributionMeta: Record<
    DistributionType,
    { title: string; metricLabel: string }
> = {
    frequency: {
        title: "Статистичний розподіл частот",
        metricLabel: "Ni",
    },
    "relative-frequency": {
        title: "Розподіл відносних частот",
        metricLabel: "Ni / N",
    },
    "cumulative-frequency": {
        title: "Розподіл накопичуваних частот",
        metricLabel: "Nнак i",
    },
    "relative-cumulative-frequency": {
        title: "Розподіл відносних накопичуваних частот",
        metricLabel: "Nнак i / N",
    },
};

export const DistributionTable: FC<DistributionTableProps> = ({
    distributionType,
    rows,
    title,
}) => {
    const { title: defaultTitle, metricLabel } =
        distributionMeta[distributionType];

    return (
        <div className="distribution-table ui-card">
            <h3>{title ?? defaultTitle}</h3>

            <div className="distribution-table-scroll">
                <table>
                    <tbody>
                        <tr>
                            <th scope="row">Xi</th>
                            {rows.map((row, index) => (
                                <td key={`value-${index}`}>{row.value}</td>
                            ))}
                        </tr>

                        <tr>
                            <th scope="row">{metricLabel}</th>
                            {rows.map((row, index) => (
                                <td key={`metric-${index}`}>{row.metric}</td>
                            ))}
                        </tr>
                    </tbody>
                </table>
            </div>
        </div>
    );
};
