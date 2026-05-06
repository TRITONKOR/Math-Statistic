import { useState, type FC } from "react";
import "./textInput.scss";

export interface TextInputProps {
    onSubmit: (value: string) => void;
}

export const TextInput: FC<TextInputProps> = ({ onSubmit }) => {
    const [text, setText] = useState("");

    return (
        <div className="text-input ui-card">
            <h2>Введіть текст</h2>
            <p className="text-input__hint">
                Вставте абзац або кілька речень для аналізу.
            </p>

            <textarea
                className="text-input__textarea"
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Введіть текст..."
            />

            <button className="ui-button" onClick={() => onSubmit(text)}>
                Аналізувати
            </button>
        </div>
    );
};
