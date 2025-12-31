import { useState } from "react";
import BaseCard from "./BaseCard";

export default function ToDoCard({ onDelete }) {
    const [tasks, setTasks] = useState([]);
    const [input, setInput] = useState("");

    function addTask() {
        if (input.trim() === "") return;

        setTasks((prevTasks) => [
            ...prevTasks,
            {
                id: Date.now(),
                text: input,
                done: false,
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
                {tasks.map((task) => (
                    <li key={task.id} className="flex items-center gap-2">
                        <input
                            type="checkbox"
                            checked={task.done}
                            onChange={() => toggleTask(task.id)}
                        />
                        <span
                            className={task.done ? "line-through text-gray-400" : ""}
                        >
                            {task.text}
                        </span>
                    </li>
                ))}
            </ul>
        </BaseCard>
    )
}