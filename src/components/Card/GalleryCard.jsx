import { useRef, useState } from "react";
import BaseCard from "./BaseCard";

export default function GalleryCard({ onDelete }) {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null); // vaste referentie naar een DOM-element

    function handleCardClick() {
        fileInputRef.current.click();
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    return (
        <BaseCard title="Gallery" onDelete={onDelete}>
            <div
                onClick={handleCardClick} 
                className="w-full h-40 border-2 border-dashed rounded flex items-center justify-center cursor-pointer hover:bg-gray-50"
            >
                {image ? ( // ternary operator om te checken op image er is of niet
                    <img
                        src={image}
                        alt="Geselecteerd"
                        className="max-h-full max-w-full object-contain"
                    />
                ) : (
                    <p className="text-gray-400 text-sm">
                        Klik om een afbeelding te kiezen
                    </p>
                )}
            </div>

            <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                onChange={handleFileChange}
                hidden
            />
        </BaseCard>
    );
}