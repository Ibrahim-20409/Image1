import React, { useState, useEffect, useRef } from "react";
import satelliteImage1 from "../../assets/images/i (2).webp";
import satelliteImage2 from "../../assets/images/12.jpg";
import satelliteImage3 from "../../assets/images/d1f16142-485b-4f9c-a5a5-889431415f4b.webp";
import satelliteImage4 from "../../assets/images/spaceship-orbits-planet-surveilling-alien-discovery-outer-space-generated-by-ai.jpg";
import satelliteImage5 from "../../assets/images/uragan-forence5_5b9a335cf2365.jpg";
import satelliteImage6 from "../../assets/images/i (3).webp";

import Drawer from "./Drawer";

const DemoCard = () => {
  const [isCardOpen, setIsCardOpen] = useState(false);
  const [currentImage, setCurrentImage] = useState(satelliteImage1); // Set the initial image
  const [showImageOptions, setShowImageOptions] = useState(false); // State to toggle image options visibility
  const imageOptionsRef = useRef(null); // Ref to detect clicks outside the image options box

  const toggleCard = () => {
    setIsCardOpen(!isCardOpen);
  };

  const changeImage = (image) => {
    setCurrentImage(image);
  };

  const toggleImageOptions = () => {
    setShowImageOptions(!showImageOptions); // Toggle the visibility of image options
  };

  // Close the image options if clicked outside the menu
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (imageOptionsRef.current && !imageOptionsRef.current.contains(event.target)) {
        setShowImageOptions(false); // Close the options if clicked outside
      }
    };

    // Add event listener for clicks outside
    document.addEventListener("mousedown", handleClickOutside);

    // Clean up event listener on component unmount
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  return (
    <div className="">
      {/* Image - Use object-cover to fill the area */}
      <img
        src={currentImage}
        alt="Demo"
        className="absolute top-0 left-0 right-0 bottom-0 w-full h-full object-cover" // Ensures the image covers the whole area
      />

      {/* Button to Open Drawer */}
      <button
        onClick={toggleCard}
        className="absolute bottom-4 right-4 bg-blue-900 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600"
      >
        Processing Levels ⏩
      </button>

      {/* Button to Show/Hide Image Options */}
      <button
        onClick={toggleImageOptions}
        className="absolute right-2 bg-grey-800 text-gray-100 px-1 py-0 rounded-lg w-30 max-h-30 shadow-md hover:bg-gray-100 text-xs"
      >
        Choose Image
      </button>

      {/* Image Options Box (Visible only when `showImageOptions` is true) */}
      {showImageOptions && (
        <div
          ref={imageOptionsRef}
          className="absolute right-0 bottom-50 bg-grey p-3 rounded-lg shadow-lg w-20 max-h-30 overflow-y-auto"
        >
          <button
            onClick={() => changeImage(satelliteImage1)}
            className="absoulute bg-gray-700 text-white px-1 py-1 rounded-lg shadow-md hover:bg-gray-600 w-full mb-2 text-xs"
          >
            Image 1
          </button>
          <button
            onClick={() => changeImage(satelliteImage2)}
            className="bg-gray-700 text-white px-1 py-1 rounded-lg shadow-md hover:bg-gray-600 w-full mb-2 text-xs"
          >
            Image 2
          </button>
          <button
            onClick={() => changeImage(satelliteImage3)}
            className="bg-gray-700 text-white px-1 py-1 rounded-lg shadow-md hover:bg-gray-600 w-full mb-2 text-xs"
          >
            Image 3
          </button>
          <button
            onClick={() => changeImage(satelliteImage4)}
            className="bg-gray-700 text-white px-1 py-1 rounded-lg shadow-md hover:bg-gray-600 w-full mb-2 text-xs"
          >
            Image 4
          </button>
          <button
            onClick={() => changeImage(satelliteImage5)}
            className="bg-gray-700 text-white px-1 py-1 rounded-lg shadow-md hover:bg-gray-600 w-full mb-2 text-xs"
          >
            Image 5
          </button>
          <button
            onClick={() => changeImage(satelliteImage6)}
            className="bg-gray-700 text-white px-1 py-1 rounded-lg shadow-md hover:bg-gray-600 w-full mb-2 text-xs"
          >
            Image 6
          </button>

        </div>
      )}

      {/* Drawer (Only visible when open) */}
      {isCardOpen && <Drawer isOpen={isCardOpen} onClose={toggleCard} />}
    </div>
  );
};

export default DemoCard;
