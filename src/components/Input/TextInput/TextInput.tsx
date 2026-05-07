import { useState, type FC } from "react";
import type { TextOption } from "../../../types/statistics";
import "./textInput.scss";

export interface TextInputProps {
    textOption: TextOption;
    onSubmit: (value: string, customValue?: string) => void;
}

export const TextInput: FC<TextInputProps> = ({ textOption, onSubmit }) => {
    const [text, setText] = useState("");
    const [customValue, setCustomValue] = useState("");

    return (
        <div className="text-input ui-card">
            <h2>Введіть текст</h2>
            <p className="text-input__hint">
                Вставте абзац або кілька речень для аналізу.
            </p>

            {textOption === "custom" && (
                <div className="text-input__custom">
                    <label htmlFor="customValue">Символи для пошуку</label>
                    <input
                        id="customValue"
                        className="text-input__custom-input"
                        type="text"
                        value={customValue}
                        onChange={(e) => setCustomValue(e.target.value)}
                        placeholder="Наприклад: а б !"
                    />
                </div>
            )}

            <textarea
                className="text-input__textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введіть текст..."
            />

            <button
                className="ui-button"
                onClick={() => onSubmit(text, customValue)}
            >
                Аналізувати
            </button>
        </div>
    );
};
