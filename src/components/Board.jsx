import { useState } from "react";
import BaseCard from "./Card/BaseCard";
import { preview } from "vite";

export default function Board() {
    const [cards, setCards] = useState([]); // ?

    function addCards(type) {
        setCards((prevCards) => [ // ?
            ...prevCards,
            {
                id: Date.now(),
                type: type,
            },
        ]);
    }

    function removeCard(id) {
        setCards((prevCards) => 
            prevCards.filter((card) => card.id !== id) // ?
        );
    }


}