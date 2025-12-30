import { useState } from "react";
import BaseCard from "./BaseCard";

export default function NoteCard( { onDelete } ) {
    const [text, setText] = useState("");

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