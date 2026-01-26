import { useState, useEffect } from "react";
import BaseCard from "./BaseCard";

export default function ToDoCard({ id, onDelete }) {
    const storageKey = `todo-${id}`;

    const [tasks, setTasks] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ? JSON.parse(saved) : [];
    });

    const [input, setInput] = useState("");

    function addTask() {
        if (input.trim() === "") return;

        setTasks((prevTasks) => [
            ...prevTasks,
            {
                id: Date.now(),
                text: input,
                done: false,
                priority: 0,
            },
        ]);

        setInput("");
    }

    function toggleTask(id) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id ? { ...task, done: !task.done } : task
            )
        );
    }

    function changePriority(id, newPriority) {
        setTasks((prevTasks) =>
            prevTasks.map((task) =>
                task.id === id
                    ? { ...task, priority: newPriority }
                    : task
            )
        );
    }

    const unfinishedTasks = [...tasks]
        .filter((task) => !task.done)
        .sort((a, b) => b.priority - a.priority);

    const finishedTasks = [...tasks]
        .filter((task) => task.done)
        .sort((a, b) => b.priority - a.priority);

    useEffect(() => { // useEffect is voor side effect (dingen die buiten react gebeuren)
        localStorage.setItem(storageKey, JSON.stringify(tasks));
    }, [tasks, storageKey]); // Run als één van deze 2 verandert

    return (
        <BaseCard title="To-Do" onDelete={onDelete}>
            
            {/* Input */}
            <div className="flex gap-2 mb-2">
                <input
                    value={input}
                    onChange={(e) => setInput(e.target.value)}
                    placeholder="Nieuwe taak..."
                    className="flex-1 p-1 border rounded"
                />
                <button
                    onClick={addTask}
                    className="px-2 bg-green-500 text-white rounded"
                >
                    +
                </button>
            </div>

            {/* Takenlijst */}
            <ul className="space-y-1">
                {/* ONVOLTOOIDE TAKEN */}
                {unfinishedTasks.map((task) => (
                    <li
                        key={task.id}
                        className={`flex items-center gap-2 ${
                            task.priority === 1
                                ? "bg-red-100"
                                : task.priority === -1
                                ? "bg-gray-100"
                                : ""
                        }`}
                    >
                        <button onClick={() => changePriority(task.id, -1)}>&lt;</button>
                        <button onClick={() => changePriority(task.id, 0)}>=</button>
                        <button onClick={() => changePriority(task.id, 1)}>&gt;</button>

                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id)}
                        />

                        <span>{task.text}</span>
                    </li>
                ))}

                {/* SCHEIDING */}
                {unfinishedTasks.length > 0 && finishedTasks.length > 0 && (
                    <li className="my-2 text-xs text-gray-400 flex items-center gap-2">
                        <div className="flex-1 h-px bg-gray-300" />
                        <span>Voltooid</span>
                        <div className="flex-1 h-px bg-gray-300" />
                    </li>
                )}

                {/* VOLTOOIDE TAKEN */}
                {finishedTasks.map((task) => (
                    <li
                        key={task.id}
                        className="flex items-center gap-2 opacity-70"
                    >
                        <button onClick={() => changePriority(task.id, -1)}>&lt;</button>
                        <button onClick={() => changePriority(task.id, 0)}>=</button>
                        <button onClick={() => changePriority(task.id, 1)}>&gt;</button>

                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id)}
                        />

                        <span className="line-through text-gray-400">
                            {task.text}
                        </span>
                    </li>
                ))}
            </ul>

        </BaseCard>
    )
}