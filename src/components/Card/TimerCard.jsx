import { useEffect, useState } from "react";
import BaseCard from "./BaseCard";

export default function TimerCard({ onDelete }) {
    const [title, setTitle] = useState("");
    const [minutes, setMinutes] = useState(5);

    const [seconds, setSeconds] = useState(0);
    const [isRunning, setIsRunning] = useState(false);

    function increaseMinutes() {
        if (!isRunning) {
            setMinutes((prev) => prev + 1);
        }
    }

    function decreaseMinutes() {
        if (!isRunning && minutes > 1) {
            setMinutes((prev) => prev - 1);
        }
    }

    function toggleTimer() {
        setIsRunning((prev) => !prev);
    }

    useEffect(() => {
        if (!isRunning) return;

        const interval = setInterval(() => {
            setSeconds((prevSeconds) => {
                if (prevSeconds > 0) {
                    return prevSeconds - 1;
                }

                if (minutes > 0) {
                    setMinutes((prevMinutes) => prevMinutes - 1);
                    return 59;
                }

                setIsRunning(false);
                return 0;
            });
        }, 1000);

        return () => clearInterval(interval); // ?
    }, [isRunning, minutes]); // ?

    return (
        <BaseCard title="Timer" onDelete={onDelete}>
            <div className="space-y-4">
                <input
                    type="text" // De soort input
                    value={title} // ?
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Waar is deze timer voor?"
                    className="w-full p-2 border rounded text-sm"
                />

                <div className="text-center text-3xl font-mono">
                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")} {/* ? */}
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={increaseMinutes}
                        disabled={isRunning} // ?
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        ▲
                    </button>

                    <button
                        onClick={decreaseMinutes}
                        disabled={isRunning} // ?
                        className="px-3 py-1 bg-gray-200 rounded disabled:opacity-50"
                    >
                        ▼
                    </button>

                </div>
                <button
                    onClick={toggleTimer}
                    className={`w-full py-2 rounded text-white ${isRunning ? "bg-red-500" : "bg-blue-500"}`}
                >
                    {isRunning ? "Stop" : "Start"}
                </button>
            </div>
        </BaseCard>
    );
}