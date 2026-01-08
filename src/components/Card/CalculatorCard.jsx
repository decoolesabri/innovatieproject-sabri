import { useState } from "react";
import BaseCard from "./BaseCard";

export default function CalculatorCard({ onDelete }) {
    const [display, setDisplay] = useState("0");
    const [currentInput, setCurrentInput] = useState("");
    const [expression, setExpression] = useState("");
    const [firstValue, setFirstValue] = useState(null);
    const [operator, setOperator] = useState(null);

    const buttons = [
        "7", "8", "9", "÷",
        "4", "5", "6", "×",
        "1", "2", "3", "−",
        "0", "C", "=", "+"
    ];

    function calculate(a, b, op) {

        switch (op) {
            case "+": return a + b;
            case "−": return a - b;
            case "×": return a * b;
            case "÷": return b === 0 ? 0 : a / b;
            default: return b;
        }

    }

    function handleButtonClick(value) {

        // Reset
        if (value === "C") {
            setDisplay("0");
            setCurrentInput("");
            setExpression("");
            setFirstValue(null);
            setOperator(null);
            return;
        }

        // Cijfers
        if (!isNaN(value)) { // Als de value WEL een number is
            const newInput = currentInput + value;
            setCurrentInput(newInput);

            if (expression) {
                setDisplay(`${expression} ${newInput}`);
            } else {
                setDisplay(newInput);
            }
            return;
        }

        // =
        if (value === "=") {
            if (!operator || currentInput === "") return;

            const result = calculate(
                firstValue,
                Number(currentInput),
                operator
            );

            setDisplay(String(result));
            setFirstValue(result);
            setCurrentInput("");
            setExpression("");
            setOperator(null);
            return;
        }

        // Operator
        const number = Number(currentInput || display);

        if (firstValue === null) {
            setFirstValue(number);
        } else if (operator) { // Als er al een berekening bezig is
            const result = calculate(firstValue, number, operator);
            setFirstValue(result);
        }

        setOperator(value);
        setExpression(`${firstValue ?? number} ${value}`); // Gebruik links, tenzij die null of undefined is
        setDisplay(`${firstValue ?? number} ${value}`);
        setCurrentInput("");

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