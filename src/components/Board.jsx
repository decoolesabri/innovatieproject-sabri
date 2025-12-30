import { useState } from "react";
import BaseCard from "./Card/BaseCard";
import CardPicker from "./CardPicker";

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
                    <BaseCard
                        title="Notitie"
                        onDelete={() => removeCard(card.id)}
                    >
                        <p>Notitie-inhoud (komt later)</p>
                    </BaseCard>
                );

            case "todo":
                return (
                    <BaseCard
                        title="To-do"
                        onDelete={() => removeCard(card.id)}
                    >
                        <p>To-do-inhoud (komt later)</p>
                    </BaseCard>
                );

            case "quote":
                return (
                    <BaseCard
                        title="Quote"
                        onDelete={() => removeCard(card.id)}
                    >
                        <p>Quote-inhoud (komt later)</p>
                    </BaseCard>
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