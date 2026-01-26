import { useRef, useState, useEffect } from "react";
import BaseCard from "./BaseCard";

export default function GalleryCard({ id, onDelete }) {
    const storageKey = `gallery-${id}`;

    const [image, setImage] = useState(() => {
        return localStorage.getItem(storageKey);
    });

    const fileInputRef = useRef(null); // Vaste referentie naar een DOM-element

    function handleCardClick() {
        fileInputRef.current.click();
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        const reader = new FileReader();

        reader.onload = () => {
            setImage(reader.result); // Base64 string
        };

        reader.readAsDataURL(file);
    }

    // Opslaan bij wijziging
    useEffect(() => {
        if (image) {
            localStorage.setItem(storageKey, image);
        }
    }, [image, storageKey]);

    return (
        <BaseCard title="Gallery" onDelete={onDelete} resizable>
            <div
                onClick={handleCardClick} 
                className="
                    w-full h-full
                    border-2 border-dashed rounded
                    flex items-center justify-center
                    cursor-pointer hover:bg-gray-50
                "
            >
                {image ? (
                    <img
                        src={image}
                        alt="Geselecteerd"
                        className="w-full h-full object-contain pointer-events-none"
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