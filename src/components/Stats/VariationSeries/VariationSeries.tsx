import type { FC } from "react";
import "./variationSeries.scss";

export interface VariationSeriesProps {
    data: number[];
}

export const VariationSeries: FC<VariationSeriesProps> = ({ data }) => {
    return (
        <div className="variation-series ui-card">
            <h3>Варіаційний ряд</h3>
            <div className="series">
                {data?.map((item, i) => (
                    <span className="series__item" key={i}>
                        {item}
                    </span>
                ))}
            </div>
        </div>
    );
};
