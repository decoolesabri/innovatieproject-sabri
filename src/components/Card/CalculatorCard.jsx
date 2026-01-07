import { useState } from "react";
import BaseCard from "./BaseCard";

export default function CalculatorCard({ onDelete }) {
    const [display, setDisplay] = useState("0");

    const buttons = [
        "7", "8", "9", "÷",
        "4", "5", "6", "×",
        "1", "2", "3", "−",
        "0", "C", "=", "+"
    ];

    function handleButtonClick(value) {
        // Reset
        if (value === "C") {
            setDisplay("0");
            return;
        }

        // Doet voor nu nog niks
        if (value === "=") {
            return;
        }

        // Als display "0" = vervang het
        if (display === "0") {
            setDisplay(value);
        } else {
            setDisplay((prev) => prev + value);
        }

    }

    return (
        <BaseCard title="Calculator" onDelete={onDelete}>
            <div className="space-y-4">

                <div className="w-full p-3 bg-gray-100 rounded text-right text-2xl font-mono">
                    {display}
                </div>

                <div className="grid grid-cols-4 gap-2">
                    {buttons.map((btn) => (
                        <button
                            key={btn}
                            onClick={() => handleButtonClick(btn)}
                            className="py-3 bg-gray-200 rounded text-lg hover:bg-gray-300"
                        >
                            {btn}
                        </button>
                    ))}
                </div>

            </div>
        </BaseCard>
    );
}