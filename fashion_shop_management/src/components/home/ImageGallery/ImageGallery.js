import React, { useState } from 'react';
import './ImageGallery.css';

function Lightbox({ image, onClose }) {
    return (
        <div className="lightbox" onClick={onClose}>
            <img src={image} alt="Lightbox" />
        </div>
    );
}

function ImageGallery({ images }) {
    const [lightboxOpen, setLightboxOpen] = useState(false);
    const [currentImage, setCurrentImage] = useState('');

    const openLightbox = (img) => {
        setCurrentImage(img);
        setLightboxOpen(true);
    };

    const closeLightbox = () => {
        setLightboxOpen(false);
    };

    return (
        <div>
            <div className="image-gallery">
                {images.map((img, index) => (
                    <img key={index} src={img} alt={`Image ${index}`} onClick={() => openLightbox(img)} />
                ))}
            </div>
            {lightboxOpen && <Lightbox image={currentImage} onClose={closeLightbox} />}
        </div>
    );
}

export default ImageGallery;
