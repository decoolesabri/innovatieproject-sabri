import { useState } from "react";
import BaseCard from "./BaseCard";
import quotes from "../../data/quotes.json";

export default function QuoteCard({ onDelete }) {
    const [quote, setQuote] = useState(() => {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        return quotes[randomIndex];
    });

    function getRandomQuote() {
        const randomIndex = Math.floor(Math.random() * quotes.length);
        setQuote(quotes[randomIndex]);
    }

    return (
        <BaseCard title="Quote" onDelete={onDelete}>
            {quote && ( // Als quote true is = rendeer, anders null
                <div className="space-y-2">
                    <p className="italic">“{quote.text}”</p>
                    <p className="text-sm text-gray-500">— {quote.author}</p>

                    <button
                        onClick={getRandomQuote}
                        className="mt-2 px-3 py-1 text-sm bg-purple-500 text-white rounded"
                    >
                        Nieuwe quote
                    </button>
                </div>
            )}
        </BaseCard>
    )
}