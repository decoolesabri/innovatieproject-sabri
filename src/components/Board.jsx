import { useState } from "react";
import BaseCard from "./Card/BaseCard";
import CardPicker from "./CardPicker";

import NoteCard from "./Card/NoteCard";
import ToDoCard from "./Card/TodoCard";
import QuoteCard from "./Card/QuoteCard";
import GalleryCard from "./Card/GalleryCard";

export default function Board() {
    const [cards, setCards] = useState([]);

    function addCard(type) {
        setCards((prevCards) => [
            ...prevCards,
            {
                id: Date.now(),
                type: type,
            },
        ]);
    }

    function removeCard(id) {
        setCards((prevCards) =>
            prevCards.filter((card) => card.id !== id)
        );
    }

    function renderCard(card) {
        switch (card.type) {
            case "note":
                return (
                    <NoteCard
                        key={card.id}
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "todo":
                return (
                    <ToDoCard
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "quote":
                return (
                    <QuoteCard
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "gallery":
                return (
                    <GalleryCard
                        onDelete={() => removeCard(card.id)}
                    />
                );


            default:
                return null;
        }
    }

    return (
        <>
            <CardPicker addCard={addCard}/>

            <div className="flex flex-wrap gap-4">
                {cards.map((card) => (
                    <div key={card.id}>
                    {renderCard(card)}
                    </div>
                ))}
            </div>
        </>
    );
}