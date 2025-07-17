import React, { useState } from "react";

const L1GContent = () => {
  const [selectedImages, setSelectedImages] = useState(null);
  const [outputDirectory, setOutputDirectory] = useState(null);

  const handleImageUpload = (event) => {
    const files = event.target.files;
    if (files.length > 0) {
      setSelectedImages(files);
    }
  };

  const handleDirectorySelect = (event) => {
    const directory = event.target.files[0];
    if (directory) {
      setOutputDirectory(directory.path);
    }
  };

  return (
    <div className="flex justify-center w-full pt-4">
      <div className="flex flex-col items-center space-y-4 p-4 rounded-lg bg-gray-900 text-gray-100 w-full max-w-lg border border-gray-700 shadow-sm">
        {/* Header */}
        <div className="w-full text-center mb-2">
          <h2 className="text-lg font-semibold text-blue-300 tracking-tight">
            L1G Product
          </h2>
          <p className="text-xs text-gray-400">Geospatial Data Processing</p>
        </div>

        {/* Upload Images Button - Increased size */}
        <div className="w-full flex flex-col items-center">
          <label
            htmlFor="image-input"
            className="w-full max-w-xs px-4 py-2.5 text-2xs bg-gray-800 hover:bg-gray-750 border border-gray-600 hover:border-green-400 text-gray-200 hover:text-white text-2sm font-medium rounded-md transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span className="text-sm">🖼️</span>
            <span>Upload Images</span>
          </label>
          <input
            id="image-input"
            type="file"
            className="hidden"
            accept="image/*"
            multiple
            onChange={handleImageUpload}
          />
          {selectedImages && (
            <div className="mt-2 w-full max-w-xs  bg-gray-850 p-2 rounded-md border border-gray-700">
              <p className="text-xs text-green-400 text-center">
                {selectedImages.length} image(s) selected
              </p>
            </div>
          )}
        </div>

        {/* Select Output Directory Button - Increased size */}
        <div className="w-full flex flex-col items-center">
          <label
            htmlFor="directory-input"
            className="w-full max-w-xs px-4 py-2.5 bg-gray-800 hover:bg-gray-750 border border-gray-600 hover:border-blue-400 text-gray-200 hover:text-white text-2sm font-medium rounded-md transition-all duration-200 flex items-center justify-center space-x-2 cursor-pointer"
          >
            <span className="text-sm">📁</span>
            <span>Select Output Dir</span>
          </label>
          <input
            id="directory-input"
            type="file"
            className="hidden"
            webkitdirectory="true"
            mozdirectory="true"
            onChange={handleDirectorySelect}
          />
          {outputDirectory && (
            <div className="mt-2 w-full max-w-xs bg-gray-850 p-2 rounded-md border border-gray-700">
              <p className="text-xs text-blue-400 text-center truncate">
                Output: {outputDirectory}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="w-full text-center mt-4 pt-3 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            • SpectraGen L1G Standard •
          </p>
        </div>
      </div>
    </div>
  );
};

export default L1GContent;