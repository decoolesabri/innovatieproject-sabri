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
        </div>
    )
}