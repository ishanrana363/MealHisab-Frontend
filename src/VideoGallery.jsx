import { useState, useRef } from 'react';
import { FaPlay, FaTimes } from 'react-icons/fa'; // Import play and close icons

const VideoGallery = () => {
    const [fullscreenVideo, setFullscreenVideo] = useState(null);
    const [isPlaying, setIsPlaying] = useState(false);
    const videoRef = useRef(null);

    const videos = [
        'https://www.w3schools.com/html/mov_bbb.mp4',
        'https://www.w3schools.com/html/movie.mp4',
        'https://www.w3schools.com/html/horse.mp4',
        // Add more video links here
    ];

    // Handle click on video thumbnail to open fullscreen
    const handleVideoClick = (video) => {
        setFullscreenVideo(video); // Set the video source to open in fullscreen
        setIsPlaying(false);  // Don't play automatically, wait for the play button click
    };

    // Close fullscreen video modal
    const closeFullscreen = () => {
        setFullscreenVideo(null);
        setIsPlaying(false);  // Reset the playing state
    };

    // Handle the play button click inside fullscreen modal
    const handlePlay = () => {
        if (videoRef.current) {
            videoRef.current.play();  // Play the video
            setIsPlaying(true);  // Update the state to indicate the video is playing
        }
    };

    return (
        <div className="relative">
            {/* Fullscreen Video Modal */}
            {fullscreenVideo && (
                <div
                    className="fixed top-0 left-0 right-0 bottom-0 bg-black bg-opacity-75 flex justify-center items-center z-50"
                    onClick={closeFullscreen} // Close modal on background click
                >
                    <div className="relative" onClick={(e) => e.stopPropagation()}> {/* Prevent modal from closing when video is clicked */}
                        <video
                            ref={videoRef}
                            src={fullscreenVideo}
                            className="w-[90vw] h-[80vh] object-contain" // Increased video width and height
                            controls={isPlaying}  // Show controls only if playing
                            autoPlay={isPlaying}  // Automatically play if set to play
                        />

                        {/* Play Button inside Fullscreen (only shown if the video is not playing) */}
                        {!isPlaying && (
                            <button
                                onClick={handlePlay}
                                className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 text-white bg-black p-4 rounded-full hover:scale-110 transition duration-200 ease-in-out"
                            >
                                <FaPlay className="text-4xl" /> {/* Play Icon */}
                            </button>
                        )}

                        {/* Close Button */}
                        <button
                            onClick={closeFullscreen}
                            className="absolute top-4 right-4 bg-gradient-to-r from-red-500 to-yellow-500 text-white rounded-full p-3 hover:bg-gradient-to-r hover:from-yellow-500 hover:to-red-500 transition duration-300 ease-in-out transform hover:scale-105"
                        >
                            <FaTimes className="text-2xl" /> {/* Close Icon */}
                        </button>
                    </div>
                </div>
            )}

            {/* Video Gallery with Marquee */}
            <div className="overflow-hidden">
                <div className="flex space-x-4 animate-marquee">
                    {videos.map((video, index) => (
                        <div
                            key={index}
                            className="relative cursor-pointer transition-transform hover:scale-105"
                            onClick={() => handleVideoClick(video)} // Open video on thumbnail click
                        >
                            <div className="w-48 h-32 bg-gray-800 rounded-lg flex justify-center items-center">
                                <span className="text-white">Video {index + 1}</span>
                                {/* Play Button on Video Thumbnail */}
                                <button
                                    onClick={(e) => { e.stopPropagation(); handleVideoClick(video); }}
                                    className="absolute inset-0 flex justify-center items-center text-white text-3xl bg-black bg-opacity-50 rounded-full hover:bg-opacity-75 transition duration-200 ease-in-out"
                                >
                                    <FaPlay />
                                </button>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
};

export default VideoGallery;
