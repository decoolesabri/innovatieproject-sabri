import { useState, useEffect } from "react";
import BaseCard from "./BaseCard";

export default function NoteCard( { id, onDelete } ) {
    const storageKey = `note-${id}`;

    // Laden uit local storage
    const [text, setText] = useState(() => {
        const saved = localStorage.getItem(storageKey);
        return saved ?? "";
    });

    // Opslaan bij wijziging
    useEffect(() => {
        localStorage.setItem(storageKey, text);
    }, [text, storageKey]);

    return (
        <BaseCard title="Notitie" onDelete={onDelete}>
            <textarea 
                value={text}
                onChange={(e) => setText(e.target.value)}
                placeholder="Schrijf hier je notitie..."
                className="w-full h-32 p-2 border rounded resize-none"
            />
        </BaseCard>
    );
}