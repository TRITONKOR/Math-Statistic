import { useState, type FC } from "react";
import "./numberInput.scss";

export interface NumberInputProps {
    onSubmit: (value: string) => void;
}

export const NumberInput: FC<NumberInputProps> = ({ onSubmit }) => {
    const [value, setValue] = useState("");

    return (
        <div className="number-input ui-card">
            <h2>Введіть числа (через пробіл)</h2>
            <p className="number-input-hint">Приклад: 1 2 3 4 5 5 7 8</p>

            <textarea
                className="number-input-textarea"
                value={value}
                onChange={(e) => setValue(e.target.value)}
                placeholder="1 2 3 4 5"
            />

            <button className="ui-button" onClick={() => onSubmit(value)}>
                Побудувати
            </button>
        </div>
    );
};
