import { useState, useEffect } from "react";
import CardPicker from "./CardPicker";

import NoteCard from "./Card/NoteCard";
import ToDoCard from "./Card/TodoCard";
import QuoteCard from "./Card/QuoteCard";
import GalleryCard from "./Card/GalleryCard";
import TimerCard from "./Card/TimerCard"
import CalculatorCard from "./Card/CalculatorCard";
import WeatherCard from "./Card/WeatherCard";

export default function Board() {
    const DEFAULT_BOARD_ID = "default";
    const DEFAULT_BOARD = {
        id: DEFAULT_BOARD_ID,
        name: "Mijn bord",
        cards: [],
    };

    const [boards, setBoards] = useState(() => {
        const saved = localStorage.getItem("boards");

        if (saved) {
            const parsed = JSON.parse(saved);

            // forceer dat Mijn bord altijd bestaat
            if (!parsed[DEFAULT_BOARD_ID]) {
                return {
                    [DEFAULT_BOARD_ID]: DEFAULT_BOARD,
                    ...parsed,
                };
            }

            return parsed;
        }

        return {
            [DEFAULT_BOARD_ID]: DEFAULT_BOARD,
        };
    });

    const [draggingId, setDraggingId] = useState(null);
    const [offset, setOffset] = useState({ x: 0, y: 0 });

    const [activeBoardId, setActiveBoardId] = useState(DEFAULT_BOARD_ID);

    const activeBoard = boards[activeBoardId];

    useEffect(() => {
        localStorage.setItem("boards", JSON.stringify(boards));
    }, [boards]);

    // Als het actieve bord even niet bestaat, stop render
    if (!activeBoard) {
        return <div className="p-4">Bord laden...</div>;
    }

    const cards = activeBoard.cards;

    function updateCards(updater) {
        setBoards((prev) => ({
            ...prev,
            [activeBoardId]: {
                ...prev[activeBoardId],
                cards: updater(prev[activeBoardId].cards),
            },
        }));
    }

    function addCard(type) {
        updateCards((prevCards) => [
            ...prevCards,
            {
                id: Date.now(),
                type,
                x: 40 + prevCards.length * 20,
                y: 40 + prevCards.length * 20,
                z: prevCards.length + 1,
            },
        ]);
    }

    function removeCard(id) {
        updateCards((prevCards) =>
            prevCards.filter((card) => card.id !== id)
        );
    }

    function renderCard(card) {
        switch (card.type) {
            case "note":
                return (
                    <NoteCard
                        id={card.id}
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "todo":
                return (
                    <ToDoCard
                        id={card.id}
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "quote":
                return (
                    <QuoteCard
                        id={card.id}
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "gallery":
                return (
                    <GalleryCard
                        id={card.id}
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "timer":
                return (
                    <TimerCard
                        id={card.id}
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "calculator":
                return (
                    <CalculatorCard
                        id={card.id}
                        onDelete={() => removeCard(card.id)}
                    />
                );

            case "weather":
                return (
                    <WeatherCard
                        id={card.id}
                        onDelete={() => removeCard(card.id)}
                    />
                );

            default:
                return null;
        }
    }

    function resetBoard() {
        updateCards(() => []);
    }

    function deleteBoard(boardId) {
        setBoards((prevBoards) => {
            const entries = Object.entries(prevBoards);

            // Minstens 1 bord houden
            if (entries.length <= 1) {
                return prevBoards;
            }

            const newBoards = { ...prevBoards };
            delete newBoards[boardId];

            // Als je het actieve bord verwijdert, witch naar een andere
            if (boardId === activeBoardId) {
                const remainingIds = Object.keys(newBoards);
                setActiveBoardId(remainingIds[0]);
            }

            return newBoards;
        });
    }

    return (
        <>
            <div className="flex gap-2 mb-3 items-center flex-wrap">
                {Object.values(boards).map((board) => (
                    <div key={board.id} className="flex items-center gap-1">
                        <button
                            onClick={() => setActiveBoardId(board.id)}
                            className={`px-3 py-1 rounded ${
                                board.id === activeBoardId
                                    ? "bg-blue-500 text-white"
                                    : "bg-gray-200"
                            }`}
                        >
                            {board.name}
                        </button>

                        {board.id !== DEFAULT_BOARD_ID && (
                            <button
                                onClick={() => deleteBoard(board.id)}
                                className="px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                                title="Verwijder bord"
                            >
                                ✕
                            </button>
                        )}
                    </div>
                ))}

                <button
                    onClick={() => {
                        const id = crypto.randomUUID();
                        setBoards((prev) => ({
                            ...prev,
                            [id]: {
                                id,
                                name: `Bord ${Object.keys(prev).length + 1}`,
                                cards: [],
                            },
                        }));
                        setActiveBoardId(id);
                    }}
                    className="px-3 py-1 bg-green-500 text-white rounded"
                >
                    + Bord
                </button>
            </div>


            <CardPicker addCard={addCard}/>

            <div className="flex justify-end mb-2">
                <button
                    onClick={resetBoard}
                    className="px-3 py-1 text-sm bg-red-500 text-white rounded hover:bg-red-600"
                >
                    Reset bord
                </button>
            </div>


            <div
                className="relative w-full h-[80vh] bg-red-100 rounded-xl p-4 overflow-auto"
                onMouseMove={(e) => {
                    if (draggingId === null) return;

                    updateCards((prevCards) =>
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
                <div className="relative w-full min-h-500">
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

                                updateCards((prevCards) => {
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
            </div>
        </>
    );
}