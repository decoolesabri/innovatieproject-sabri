import { useState } from "react";
import CardPicker from "./CardPicker";

import NoteCard from "./Card/NoteCard";
import ToDoCard from "./Card/TodoCard";
import QuoteCard from "./Card/QuoteCard";
import GalleryCard from "./Card/GalleryCard";
import TimerCard from "./Card/TimerCard"
import CalculatorCard from "./Card/CalculatorCard";
import WeatherCard from "./Card/WeatherCard";

export default function Board() {
    const [cards, setCards] = useState([]);
    const [draggingId, setDraggingId] = useState(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    function addCard(type) {
        setCards((prevCards) => [
            ...prevCards,
            {
                id: Date.now(),
                type: type,
                x: 40 + prevCards.length * 20,
                y: 40 + prevCards.length * 20,
                z: prevCards.length + 1,
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

            case "timer":
                return (
                    <TimerCard
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "calculator":
                return (
                    <CalculatorCard
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "weather":
                return (
                    <WeatherCard
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

            <div
                className="relative w-full min-h-[80vh] bg-red-100 rounded-xl p-4 overflow-hidden"
                onMouseMove={(e) => {
                    if (draggingId === null) return;

                    setCards((prevCards) =>
                        prevCards.map((card) =>
                            card.id === draggingId
                                ? {
                                    ...card,
                                    x: e.clientX - offset.x,
                                    y: e.clientY - offset.y,
                                }
                                : card
                        )
                    );
                }}
                onMouseUp={() => setDraggingId(null)}
            >
                {cards.map((card) => (
                    <div 
                        key={card.id}
                        className="absolute cursor-move"
                        style={{
                            left: card.x,
                            top: card.y,
                            zIndex: card.z,
                        }}
                        onMouseDown={(e) => {
                            setDraggingId(card.id);

                            setOffset({
                                x: e.clientX - card.x,
                                y: e.clientY - card.y,
                            });

                            setCards((prevCards) => {
                                const maxZ = Math.max(...prevCards.map((c) => c.z));
                                return prevCards.map((c) =>
                                    c.id === card.id
                                        ? { ...c, z: maxZ + 1 }
                                        : c
                                );
                            });
                        }}
                    >
                        {renderCard(card)}
                    </div>
                ))}
            </div>
        </>
    );
}