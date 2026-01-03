import { useRef, useState } from "react";
import BaseCard from "./BaseCard";

export default function GalleryCard({ onDelete }) {
    const [image, setImage] = useState(null);
    const fileInputRef = useRef(null); // ?

    function handleCardClick() {
        fileInputRef.current.click(); // ?
    }

    function handleFileChange(e) {
        const file = e.target.files[0];
        if (!file) return;

        const imageUrl = URL.createObjectURL(file);
        setImage(imageUrl);
    }

    return (

    );
}