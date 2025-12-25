export default function BaseCard({ title, onDelete, children }) {
    return (
        <div className="w-72 bg-white rounded-xl shadow-md flex flex-col">

            {/* Header van het kaartje */}
            <div className="px-4 py-2 border-b font-semibold">
                {title}
            </div>

            {/* Content van het kaartje */}
            <div className="flex-1 p-4">
                {children}
            </div>

            {/* Footer van het kaartje */}
            <div className="px-4 py-2 border-t">
                <button
                onClick={onDelete}
                className="w-full text-sm text-red-600 hover:text-red-800"
                >
                    Verwijderen
                </button>
            </div>

        </div>
    )
}