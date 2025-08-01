import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { API_ENDPOINTS, axiosInstance } from "../../api/ApiConfig";

const L1AContent = () => {
  const [errors, setErrors] = useState({
    calibrationDatasets: "",
  });

  const [selectedFiles, setSelectedFiles] = useState({
    calibrationDatasets: [],
  });

  const [performCalibration, setPerformCalibration] = useState(false);
  const [uploadProgress, setUploadProgress] = useState(0);
  const [receivedFiles, setReceivedFiles] = useState([]);

  useEffect(() => {
    const handleFilesProcessed = (event) => {
      setReceivedFiles(event.detail);
    };
    window.addEventListener('filesProcessed', handleFilesProcessed);
    return () => {
      window.removeEventListener('filesProcessed', handleFilesProcessed);
    };
  }, []);

  const imageCount = receivedFiles.filter(file => file.type === 'image').length;
  const jsonCount = receivedFiles.some(file => file.type === 'json') ? 1 : 0;

  const handleFileChange = (event) => {
    const files = Array.from(event.target.files);
    let errorMessage = "";

    const invalid = files.some(
      (file) =>
        !file.type.startsWith("image/png") && !file.type.startsWith("image/jpeg")
    );
    if (invalid) errorMessage = "Please select valid image files.";

    if (errorMessage) {
      setErrors({ calibrationDatasets: errorMessage });
      setSelectedFiles({ calibrationDatasets: [] });
    } else {
      setErrors({ calibrationDatasets: "" });
      setSelectedFiles({ calibrationDatasets: files });
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    selectedFiles.calibrationDatasets.forEach((file) => {
      formData.append("calibration_datasets", file);
    });

    const toastId = toast.loading("Uploading files...");

    try {
      const response = await axios.post(
        "http://127.0.0.1:8000/api/monitoring/upload-dataset",
        formData,
        {
          headers: {
            "Content-Type": "multipart/form-data",
          },
          onUploadProgress: (progressEvent) => {
            const percent = Math.round(
              (progressEvent.loaded * 100) / progressEvent.total
            );
            setUploadProgress(percent);
            toast.update(toastId, {
              render: `Uploading... ${percent}%`,
              isLoading: true,
            });
          },
        }
      );

      toast.update(toastId, {
        render: "Upload successful!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error(error);
      toast.update(toastId, {
        render: "Upload failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    } finally {
      setUploadProgress(0);
    }
  };

  const handleCalibration = async () => {
    const toastId = toast.loading("Processing calibration...");
    try {
      const response = await axiosInstance.get(API_ENDPOINTS.CALIBRATION);
      console.log("Calibration Response:", response.data);

      toast.update(toastId, {
        render: "Calibration processed successfully!",
        type: "success",
        isLoading: false,
        autoClose: 3000,
      });
    } catch (error) {
      console.error("Error during calibration:", error);
      toast.update(toastId, {
        render: "Calibration failed. Please try again.",
        type: "error",
        isLoading: false,
        autoClose: 3000,
      });
    }
  };

  const isUploadDisabled = selectedFiles.calibrationDatasets.length === 0;

  return (
    <div className="flex justify-center w-full pt-4">
      <ToastContainer
        position="bottom-right"
        autoClose={2000}
        hideProgressBar={false}
        closeOnClick
        draggable
        pauseOnHover
        theme="dark"
        toastClassName="z-50"
        containerClassName="z-50"
      />
      <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-gray-900 text-gray-100 w-full max-w-lg border border-gray-700 shadow-sm">
        <div className="w-full text-center mb-2">
          <h2 className="text-lg font-semibold text-blue-300 tracking-tight">
            L1A Product
          </h2>
          <p className="text-xs text-gray-400">Data Processing Interface</p>
        </div>

        {/* Satellite Images Button with Dynamic Counter */}
        <div className="w-full flex flex-col items-center">
          <button
            type="button"
            className="w-full max-w-xs px-4 py-1 text-2xs font-medium rounded-md transition-all duration-200 bg-gray-800 border border-gray-600 text-gray-200 flex items-center justify-center space-x-2"
          >
            <span className="text-xs">🛰️</span>
            <span>Satellite Images</span>
          </button>
          <input
            type="text"
            readOnly
            value={`${imageCount} Files`}
            className="w-14 max-w-xs px-1 py-1 mt-2 text-xs text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none"
          />
        </div>

        {/* JSON Config Button with Dynamic Counter */}
        <div className="w-full flex flex-col items-center">
          <button
            type="button"
            className="w-full max-w-xs px-4 py-1 text-2xs font-medium rounded-md transition-all duration-200 bg-gray-800 border border-gray-600 text-gray-200 flex items-center justify-center space-x-2"
          >
            <span className="text-xs">📋</span>
            <span>JSON Config</span>
          </button>
          <input
            type="text"
            readOnly
            value={`${jsonCount} Files`}
            className="w-14 max-w-xs px-1 py-1 mt-2 text-xs text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none"
          />
        </div>

        {/* Calibration Datasets (Working Input) */}
        <div className="w-full flex flex-col items-center relative group">
          <label
            htmlFor="calibration-datasets"
            className="w-full max-w-xs px-4 py-1 text-2xs font-medium rounded-md transition-all duration-200 bg-gray-800 hover:bg-gray-750 border border-gray-600 hover:border-blue-400 text-gray-200 hover:text-white cursor-pointer flex items-center justify-center space-x-2"
          >
            <span className="text-xs">🎯</span>
            <span>Calibration Datasets</span>
          </label>
          <input
            id="calibration-datasets"
            type="file"
            className="hidden"
            accept="image/png, image/jpeg"
            multiple
            onChange={handleFileChange}
          />
          {errors.calibrationDatasets && (
            <div className="text-xs text-red-500 mt-1">{errors.calibrationDatasets}</div>
          )}
          <input
            type="text"
            readOnly
            value={`${selectedFiles.calibrationDatasets.length} Files`}
            className="w-14 max-w-xs px-1 py-1 mt-2 text-xs text-white bg-gray-900 border border-gray-600 rounded-md focus:outline-none"
          />
          <div className="absolute z-10 top-10 invisible opacity-10 group-hover:opacity-100 group-hover:visible transition-opacity duration-300 px-3 py-1 text-xs font-medium text-white bg-gray-900 rounded-lg shadow-xs">
            {selectedFiles.calibrationDatasets.map((file) => (
              <div key={file.name}>{file.name}</div>
            ))}
          </div>
        </div>

        <button
          className={`w-full max-w-xs px-4 py-2 rounded-md mt-4 ${
            isUploadDisabled
              ? "bg-gray-600 text-gray-300 cursor-not-allowed"
              : "bg-blue-600 text-white hover:bg-blue-700"
          }`}
          onClick={handleSubmit}
          disabled={isUploadDisabled}
        >
          Upload
        </button>

        <div className="flex items-center space-x-2 mt-4">
          <input
            type="checkbox"
            id="performCalibration"
            checked={performCalibration}
            onChange={(e) => setPerformCalibration(e.target.checked)}
            className="h-4 w-4 text-blue-600 bg-gray-100 border-gray-300 rounded focus:ring-blue-500"
          />
          <label htmlFor="performCalibration" className="text-sm text-gray-200">
            Perform Calibration
          </label>
        </div>

        {performCalibration && (
          <button
            className="w-full max-w-xs px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 mt-4"
            onClick={handleCalibration}
          >
            Start Calibration
          </button>
        )}

        <div className="w-full text-center mt-4 pt-3 border-t border-gray-800">
          <p className="text-xs text-gray-500">• SpectraGen L1A Standard •</p>
        </div>
      </div>
    </div>
  );
};

export default L1AContent;