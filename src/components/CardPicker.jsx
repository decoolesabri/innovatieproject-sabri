export default function CardPicker({ addCard }) {
    return (
        <div className="flex gap-2 mb-6">
            <button
                onClick={() => addCard("note")}
                className="px-4 py-2 bg-blue-500 text-white rounded"
            >
                Notitie
            </button>

            <button
                onClick={() => addCard("todo")}
                className="px-4 py-2 bg-green-500 text-white rounded"
            >
                To-do
            </button>

            <button
                onClick={() => addCard("quote")}
                className="px-4 py-2 bg-purple-500 text-white rounded"
            >
                Quote
            </button>

            <button
                onClick={() => addCard("gallery")}
                className="px-4 py-2 bg-pink-500 text-white rounded"
            >
                Gallery
            </button>

            <button
                onClick={() => addCard("timer")}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Timer
            </button>

            <button
                onClick={() => addCard("calculator")}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Calculator
            </button>

            <button
                onClick={() => addCard("weather")}
                className="px-4 py-2 bg-red-500 text-white rounded"
            >
                Weer
            </button>
        </div>
    );
}