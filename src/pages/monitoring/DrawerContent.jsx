import React, { useState } from "react";
import L0Content from "./L0Content.jsx";
import L1AContent from "./L1AContent";
import L1CContent from "./L1CContent";
import L1GContent from "./L1GContent";

const DrawerContent = () => {
  const [selectedContent, setSelectedContent] = useState("L0"); // Initial content to show is "L0"

  const handleCircleClick = (level) => {
    setSelectedContent(level); // Update state to show the corresponding content
  };

  // Map the selectedContent to the appropriate component
  const renderSelectedContent = () => {
    switch (selectedContent) {
      case "L0":
        return <L0Content />;
      case "L1A":
        return <L1AContent />;
      case "L1C":
        return <L1CContent />;
      case "L1G":
        return <L1GContent />;
      default:
        return <L0Content />;
    }
  };

  const circleTexts = ["L0", "L1A", "L1C", "L1G"]; // Array with different text for each circle

  return (
    <div className="h-full p-4 grid grid-cols-3 gap-4 bg-gray-900 text-white">
      {/* Left Grid Section (2/3 width) */}
      <div className="max-h-full- center space bg-gray-800 p-6 rounded-lg shadow-md col-span-2">
        <h2 className="text-xl font-semibold">Configurations</h2>
        <div className="space-y-4">{renderSelectedContent()}</div> {/* Render the selected content here */}
      </div>

      {/* Right Grid Section (1/3 width) */}
      <div className="bg-gray-800 p-6 rounded-lg shadow-md col-span-1">
        <h2 className="text-xl font-semibold">Product Levels</h2>
        <div className="flex flex-col justify-start h-full p-4 space-y-4">
          {circleTexts.map((text, index) => (
            <div
              key={index}
              className={`w-16 h-16 rounded-full flex items-center justify-center text-white font-semibold cursor-pointer 
                ${selectedContent === text ? 'bg-green-500' : 'bg-blue-600'} 
                hover:bg-blue-700 transition-all duration-200`}
              onClick={() => handleCircleClick(text)} // Handle click event
            >
              {text} {/* Display text from array */}
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default DrawerContent;
