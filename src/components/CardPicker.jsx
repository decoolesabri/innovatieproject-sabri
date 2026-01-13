import { useState } from "react";

export default function CardPicker({ addCard }) {
    const [open, setOpen] = useState(false);

    function add(type) {
        addCard(type);
        setOpen(false);
    }

    return (
        <div className="flex items-center gap-2">
            {/* Open button */}
            <button
                onClick={() => setOpen((prev) => !prev)}
                className="px-4 py-2 bg-gray-800 text-white rounded-lg flex items-center gap-2 shrink-0"
            >
                <span>➕</span>
                <span>Kaart toevoegen</span>
            </button>

            {/* Inline expandable buttons */}
            {open && (
                <div className="
                    flex gap-2
                    p-2 bg-white rounded-xl shadow
                    max-w-[70vw] overflow-x-auto
                ">
                    <PickerButton label="Notitie" color="bg-blue-500" onClick={() => add("note")} />
                    <PickerButton label="To-do" color="bg-green-500" onClick={() => add("todo")} />
                    <PickerButton label="Quote" color="bg-purple-500" onClick={() => add("quote")} />
                    <PickerButton label="Gallery" color="bg-pink-500" onClick={() => add("gallery")} />
                    <PickerButton label="Timer" color="bg-red-500" onClick={() => add("timer")} />
                    <PickerButton label="Calculator" color="bg-orange-500" onClick={() => add("calculator")} />
                    <PickerButton label="Weer" color="bg-yellow-500" onClick={() => add("weather")} />
                </div>
            )}
        </div>
    );
}

function PickerButton({ label, color, onClick }) {
    return (
        <button
            onClick={onClick}
            className={`
                px-3 py-1.5 
                rounded-md 
                text-white text-sm font-medium
                whitespace-nowrap
                ${color} 
                hover:opacity-90
                transition
            `}
        >
            {label}
        </button>
    );
}