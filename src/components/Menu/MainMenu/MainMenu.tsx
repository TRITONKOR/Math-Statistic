import { useState, type FC } from "react";
import "./mainMenu.scss";

export interface MainMenuProps {
    onStart: (options: { mode: string; textOption: string }) => void;
}

export const MainMenu: FC<MainMenuProps> = ({ onStart }) => {
    const [mode, setMode] = useState("numbers");
    const [textOption, setTextOption] = useState("wordLength");

    return (
        <div className="menu ui-card">
            <h1 className="menu-title">Математична статистика</h1>
            <p className="menu-subtitle">
                Оберіть формат даних і починайте аналіз.
            </p>

            <div className="menu-modes">
                <label className="menu-mode">
                    <input
                        type="radio"
                        value="numbers"
                        checked={mode === "numbers"}
                        onChange={() => setMode("numbers")}
                    />
                    Числа
                </label>

                <label className="menu-mode">
                    <input
                        type="radio"
                        value="text"
                        checked={mode === "text"}
                        onChange={() => setMode("text")}
                    />
                    Текст
                </label>
            </div>

            {mode === "text" && (
                <div className="menu-text-options">
                    <h3>Тип аналізу:</h3>

                    <select
                        className="menu-select"
                        value={textOption}
                        onChange={(e) => setTextOption(e.target.value)}
                    >
                        <option value="wordLength">Довжина слів</option>
                        <option value="sentenceLength">Довжина речень</option>
                        <option value="custom">Пошук за символами</option>
                    </select>
                </div>
            )}

            <button
                className="ui-button"
                onClick={() => onStart({ mode, textOption })}
            >
                Почати
            </button>
        </div>
    );
};
