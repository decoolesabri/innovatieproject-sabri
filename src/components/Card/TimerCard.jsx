import { useEffect, useState } from "react";
import BaseCard from "./BaseCard";

export default function TimerCard({ onDelete }) {
    const storageKey = "timer-card";

    const [title, setTitle] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved).title : "";
    });

    const [minutes, setMinutes] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved).minutes : 5;
    });

    const [seconds, setSeconds] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved).seconds : 0;
    });

    const [isFinished, setIsFinished] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved).isFinished : false;
    });

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
        if (!isRunning) {
            setIsFinished(false);

            if (seconds === 0) {
                setSeconds(59);
                setMinutes((prev) => prev - 1);
            }
        }

        setIsRunning((prev) => !prev);
    }

    useEffect(() => { // Reageert op state veranderingen
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
                setIsFinished(true);
                return 0;
            });
        }, 1000);

        return () => clearInterval(interval); // Opruimen
    }, [isRunning, minutes]); // Wanneer effect opnieuw mag draaien

    useEffect(() => {
        const data = {
            title,
            minutes,
            seconds,
            isFinished,
        };

        localStorage.setItem(storageKey, JSON.stringify(data));
    }, [title, minutes, seconds, isFinished]);

    return (
        <BaseCard title="Timer" onDelete={onDelete}>
            <div
                className={`space-y-4 transition-all ${
                    isFinished ? "ring-4 ring-red-700 animate-pulse rounded-xl" : ""
                }`}
            >
                <input
                    type="text" // De soort input
                    value={title}
                    onChange={(e) => setTitle(e.target.value)}
                    placeholder="Waar is deze timer voor?"
                    className="w-full p-2 border rounded text-sm"
                />

                <div className={`text-center text-3xl font-mono ${
                        isFinished ? "text-red-700 font-bold" : ""
                    }`}
                >
                    {String(minutes).padStart(2, "0")}:
                    {String(seconds).padStart(2, "0")}
                </div>

                <div className="flex justify-center gap-4">
                    <button
                        onClick={increaseMinutes}
                        disabled={isRunning}
                        className="px-3 py-1 bg-gray-200 rounded hover:bg-gray-300"
                    >
                        ▲
                    </button>

                    <button
                        onClick={decreaseMinutes}
                        disabled={isRunning}
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