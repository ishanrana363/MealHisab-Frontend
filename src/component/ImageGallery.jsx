import { useState } from 'react';
import { FaTimes } from 'react-icons/fa'; // Importing the cross icon from react-icons

const ImageGallery = () => {
    const [fullscreenImage, setFullscreenImage] = useState(null);
    
    const images = [
        'https://via.placeholder.com/300x200/FF5733/fff?text=Image+1',
        'https://via.placeholder.com/300x200/33FF57/fff?text=Image+2',
        'https://via.placeholder.com/300x200/3357FF/fff?text=Image+3',
        'https://via.placeholder.com/300x200/FF33A1/fff?text=Image+4',
        'https://via.placeholder.com/300x200/FF5733/fff?text=Image+5',
        'https://via.placeholder.com/300x200/33FF57/fff?text=Image+6',
        'https://via.placeholder.com/300x200/3357FF/fff?text=Image+7',
        'https://via.placeholder.com/300x200/FF33A1/fff?text=Image+8',
        'https://via.placeholder.com/300x200/FF5733/fff?text=Image+9',
        'https://via.placeholder.com/300x200/33FF57/fff?text=Image+10',
    ];

    const handleImageClick = (image) => {
        setFullscreenImage(image);
    };

    const closeFullscreen = () => {
        setFullscreenImage(null);
    };

    return (
        <div className="relative">
            {/* Fullscreen Image Modal */}
            {fullscreenImage && (
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    onClick={closeFullscreen}
                >
                    <div className="relative">
                        <img
                            src={fullscreenImage}
                            alt="Fullscreen"
                            className="max-w-full max-h-full"
                        />
                        <button
                            onClick={closeFullscreen}
                            className="absolute top-4 right-4 text-white text-3xl bg-black bg-opacity-50 p-2 rounded-full hover:bg-opacity-75"
                        >
                            <FaTimes />
                        </button>
                    </div>
                </div>
            )}

            {/* Image Gallery with Marquee */}
            <div className="overflow-hidden">
                <div className="flex space-x-4 animate-marquee">
                    {images.map((image, index) => (
                        <div
                            key={index}
                            className="cursor-pointer transition-transform hover:scale-105"
                            onClick={() => handleImageClick(image)}
                        >
                            <img
                                src={image}
                                alt={`Image ${index + 1}`}
                                className="w-48 h-32 object-cover rounded-lg"
                            />
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default ImageGallery;
