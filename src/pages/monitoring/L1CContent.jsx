import React from "react";

const L1CContent = () => {
  const handleFileSelect = (event) => {
    const file = event.target.files[0];
    if (file) {
      alert(`Selected: ${file.name}\n\nOpen in ERDAS Imagine for L1C processing.`);
    }
  };

  return (
    <div className="flex justify-center w-90 pt-4">
      <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-gray-900 text-gray-100 w-full max-w-md border border-gray-700 shadow-sm">
        {/* Header */}
        <div className="w-full text-center mb-2">
          <h2 className="text-lg font-semibold text-blue-300 tracking-tight">
            L1C Product 
          </h2>
          <p className="text-xs text-gray-400 mt-1">ERDAS Imagine Integration</p>
        </div>

        {/* ERDAS Imagine Button - Now more compact */}
        <div className="w-full flex flex-col items-center">
          <button
            onClick={() => document.getElementById("erdas-file-input").click()}
            className="w-max max-w-xl px-4 py-2.5 bg-gray-800 hover:bg-gray-750 border border-gray-600 hover:border-blue-400 -gray-200 hover:text-white text-m font-medium rounded transition-all duration-200 flex items-center justify-center space-x-1"
          >
            <span className="text-xs">🌐</span>
            <span>Open ERDAS Imagine</span>
          </button>
          
          <input
            id="erdas-file-input"
            type="file"
            className="hidden"
            onChange={handleFileSelect}
          />
        </div>

        {/* Footer */}
        <div className="w-full text-center mt-4 pt-3 border-t border-gray-800">
          <p className="text-xs text-gray-500">
            • SpectraGen L1C Standard •
          </p>
        </div>
      </div>
    </div>
  );
};

export default L1CContent;