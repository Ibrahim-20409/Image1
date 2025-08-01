import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import finalIcon from "../../assets/icons/final_Icon.png";
import JSZip from "jszip";
import { EyeIcon, SlashIcon as EyeSlashIcon, Download, FileText, Image as ImageIcon, X } from 'lucide-react';

// CHANGE: Added onFilesProcessed prop to enable data passing to parent component
const L0Content = ({ onComplete, onFilesProcessed }) => {
  const toastId = useRef(null);
  const [showKeys, setShowKeys] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [fileError, setFileError] = useState("");
  const [isFileValid, setIsFileValid] = useState(false);
  const [showEncryption, setShowEncryption] = useState(false);
  const [showDecryption, setShowDecryption] = useState(false);
  const [outputFiles, setOutputFiles] = useState([]);
  const [showDownloadModal, setShowDownloadModal] = useState(false);
  const [selectedImage, setSelectedImage] = useState(null);
  const [isStacking, setIsStacking] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm();

  const selectedFile = watch("file");

  useEffect(() => {
    if (selectedFile && selectedFile[0]) {
      const fileName = selectedFile[0].name.toLowerCase();
      if (!fileName.endsWith(".bin")) {
        setFileError("Only .bin files are allowed");
        setIsFileValid(false);
        toast.error("Only .bin files are allowed", { theme: "dark" });
      } else {
        setFileError("");
        setIsFileValid(true);
      }
    } else {
      setFileError("");
      setIsFileValid(false);
    }
  }, [selectedFile]);

  useEffect(() => {
    return () => {
      outputFiles.forEach(file => {
        if (file.blobUrl) {
          URL.revokeObjectURL(file.blobUrl);
        }
      });
    };
  }, [outputFiles]);

  const allowedCharacters = '0123456789[],';

  const handleKeyDown = (event) => {
    if (event.key.length === 1 && !allowedCharacters.includes(event.key)) {
      event.preventDefault();
    }
  };

  const onSubmit = async (data) => {
    if (!isFileValid || !data.file || !data.file[0]) {
      toast.error("Please select a valid BIN file", { theme: "dark" });
      return;
    }

    setOutputFiles([]);
    setSelectedImage(null);
    setIsUploaded(true);
    setFileError("");

    const formData = new FormData();
    formData.append("file", data.file[0]);

    if (showKeys) {
      formData.append("encryptionKey", data.encryptionKey || "");
      formData.append("ivKey", data.decryptionKey || "");
    }
   
    try {
      const response = await fetch("http://localhost:8000/api/monitoring/upload/l0_bin", {
        method: "POST",
        body: formData,
      });

      if (!response.ok) {
        throw new Error("Upload failed");
      }

      toastId.current = toast.info("Processing file...", {
        theme: "dark",
        autoClose: false,
        isLoading: true,
      });

      const result = await response.json();

      const processedFiles = [];
      if (result.images && result.images.length > 0) {
        for (const imageData of result.images) {
          try {
            const byteCharacters = atob(imageData.data);
            const byteNumbers = new Array(byteCharacters.length);
            for (let i = 0; i < byteCharacters.length; i++) {
              byteNumbers[i] = byteCharacters.charCodeAt(i);
            }
            const byteArray = new Uint8Array(byteNumbers);
            const blob = new Blob([byteArray], { type: imageData.mimeType || 'image/png' });
            const blobUrl = URL.createObjectURL(blob);

            processedFiles.push({
              type: 'image',
              name: imageData.filename,
              blobUrl: blobUrl,
              blob: blob,
              size: blob.size
            });
          } catch (error) {
            console.error('Error processing image:', error);
          }
        }
      }

      if (result.json_data) {
        const jsonBlob = new Blob([JSON.stringify(result.json_data, null, 2)],
          { type: 'application/json' });
        processedFiles.push({
          type: 'json',
          name: result.json_filename || 'JSON.json',
          data: result.json_data,
          blob: jsonBlob,
          blobUrl: URL.createObjectURL(jsonBlob),
          size: jsonBlob.size
        });
      }

      setOutputFiles(processedFiles);

      // CHANGE: Call onFilesProcessed immediately after setOutputFiles to pass data to L1AContent
      if (onFilesProcessed) {
        console.log("Calling onFilesProcessed with processedFiles:", processedFiles);
        onFilesProcessed(processedFiles);
      }

      const firstImage = processedFiles.find(file => file.type === 'image');
      if (firstImage) {
        setSelectedImage(firstImage);
      } else {
        setSelectedImage(null);
      }

      toast.update(toastId.current, {
        render: "Upload complete",
        type: "success",
        isLoading: false,
        autoClose: 5000,
        theme: "dark",
      });

      if (onComplete) {
        console.log("Calling onComplete with outputFiles:", processedFiles);
        onComplete(processedFiles);
      }
    } catch (error) {
      toast.error("Upload failed: " + error.message, { theme: "dark" });
    } finally {
      setIsUploaded(false);
    }
  };

  const handleLayerStacking = () => {
    setIsStacking(true);
    setTimeout(() => setIsStacking(false), 2000);
  };

  const downloadFile = (blob, filename) => {
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    URL.revokeObjectURL(url);
  };

  const handleDownloadAll = async () => {
    const zip = new JSZip();
    outputFiles.forEach(file => {
      zip.file(file.name, file.blob);
    });
    const content = await zip.generateAsync({ type: "blob" });
    downloadFile(content, "L0_Images_and_Config.zip");
  };

  const handleImageSelect = (imageFile) => {
    setSelectedImage(imageFile);
  };

  const imageFiles = outputFiles.filter(file => file.type === 'image');
  const hasImages = imageFiles.length > 0;

  return (
    <div className="flex flex-col lg:flex-row justify-center w-full pt-4 px-4 space-y-4 lg:space-y-0 lg:space-x-6 relative">
      {hasImages && (
        <div className="absolute right-[900px] top-[0px] w-[1300px] h-[1100px]">
          {selectedImage ? (
            <>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-lg font-semibold text-blue-300 text-center">
                  {selectedImage.name}
                </h3>
              </div>
              <img
                src={selectedImage.blobUrl}
                alt={selectedImage.name}
                className="max-w-full max-h-[80vh] top-[0px] w-[1300px] h-[1100px] object-contain rounded"
                onError={(e) => {
                  console.error('Image failed to load:', e);
                  console.log('Image URL:', selectedImage.blobUrl);
                }}
              />
            </>
          ) : (
            <div className="flex items-center justify-center h-96 bg-black rounded-lg">
              <div className="text-center text-gray-400">
                <ImageIcon className="h-16 w-16 mx-auto mb-4" />
                <p>Select an image thumbnail below</p>
              </div>
            </div>
          )}
          <div className="flex flex-wrap justify-start gap-3 mb-4">
            {imageFiles.map((file, index) => (
              <button
                key={index}
                onClick={() => handleImageSelect(file)}
                className={`relative w-20 h-20 rounded-lg border-2 transition-all duration-200 ${
                  selectedImage?.name === file.name
                    ? 'border-blue-400 bg-blue-900/20'
                    : 'border-gray-600 hover:border-gray-400'
                }`}
              >
                <img
                  src={file.blobUrl}
                  alt={file.name}
                  className="w-full h-full object-cover rounded"
                />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b truncate">
                  {file.name.replace('.png', '')}
                </div>
              </button>
            ))}
            {outputFiles.find(file => file.type === 'json') && (
              <button
                onClick={() => setShowDownloadModal(true)}
                className="relative w-20 h-20 rounded-lg border-2 border-purple-600 bg-purple-600 hover:bg-purple-700 transition-all duration-200 flex items-center justify-center"
              >
                <FileText className="h-8 w-8 text-white" />
                <div className="absolute bottom-0 left-0 right-0 bg-black bg-opacity-75 text-white text-xs p-1 rounded-b">
                  JSON
                </div>
              </button>
            )}
          </div>
          <div className="flex justify-start">
            <button
              onClick={() => setShowDownloadModal(true)}
              className="bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-lg text-sm font-medium flex items-center space-x-2 transition-colors"
            >
              <Download className="h-4 w-4" />
              <span>Download Images and JSON CONFIG</span>
            </button>
          </div>
        </div>
      )}
      <div className="w-full max-w-sm flex-shrink-0">
        <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-gray-900 text-gray-100 w-full border border-gray-700 shadow-sm">
          <div className="w-full text-center mb-3">
            <h2 className="text-lg font-semibold text-blue-300 tracking-tight">L0 Product</h2>
            <p className="text-xs text-gray-400">Raw Data Processing</p>
          </div>
          <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
            <div className="flex flex-col items-center">
              <label
                htmlFor="file"
                className="relative w-38 h-40 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-400 text-gray-200 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 flex flex-col items-center justify-center cursor-pointer"
              >
                <img
                  src={finalIcon}
                  alt="bin"
                  className="w-20 h-18 object-contain mb-1"
                />
                <div className="w-full px-2 flex items-center justify-between mt-1">
                  <span style={{ fontSize: "14px" }} className="italic text-gray-300">
                    Click to <br /> add Bin File
                  </span>
                  <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                    <span className="text-white text-3xl leading-none">+</span>
                  </div>
                </div>
              </label>
              <input
                id="file"
                type="file"
                {...register("file", { required: "File is required" })}
                className="hidden"
              />
              {selectedFile?.[0] && (
                <div className="mt-2 w-full max-w-xs bg-gray-850 p-2 rounded-md border border-gray-700">
                  <p className="text-xs text-green-400 text-center truncate">
                    {selectedFile[0]?.name}
                  </p>
                </div>
              )}
              {fileError && <p className="text-xs text-amber-400 mt-1 text-center w-full">{fileError}</p>}
              {errors.file && <p className="text-xs text-red-400 mt-1 text-center w-full">{errors.file.message}</p>}
            </div>
            <div className="w-full mt-4 border-t border-gray-800 pt-4">
              <p className="text-m font-semibold text-blue-300 mb-2 text-center">Encryption Settings</p>
              <div className="flex items-center space-x-2 mb-3 justify-center">
                <input
                  type="checkbox"
                  id="toggleKeys"
                  checked={showKeys}
                  onChange={(e) => setShowKeys(e.target.checked)}
                  className="form-checkbox h-4 w-4 text-blue-400"
                />
                <label htmlFor="toggleKeys" className="text-xs text-gray-300">
                  Provide Security Keys
                </label>
              </div>
              {showKeys && (
                <div className="space-y-3">
                  <div>
                    <label htmlFor="encryption" className="block text-xs text-gray-300 mb-1">Key</label>
                    <div className="relative">
                      <input
                        id="encryption"
                        type={showEncryption ? 'text' : 'password'}
                        placeholder="Enter key"
                        {...register("encryptionKey", {
                          required: showKeys ? "Key is required" : false,
                          pattern: {
                            value: /^[0-9,\[\]]*$/,
                            message: "Only numbers, commas, and brackets are allowed"
                          }
                        })}
                        onKeyDown={handleKeyDown}
                        className="w-full px-3 py-1 text-sm text-gray-100 bg-gray-800 border border-gray-600 rounded-md pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowEncryption(!showEncryption)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showEncryption ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.encryptionKey && (
                      <p className="text-red-400 text-xs mt-1">{errors.encryptionKey.message}</p>
                    )}
                  </div>
                  <div>
                    <label htmlFor="decryption" className="block text-xs text-gray-300 mb-1">IV</label>
                    <div className="relative">
                      <input
                        id="decryption"
                        type={showDecryption ? 'text' : 'password'}
                        placeholder="Enter IV"
                        {...register("decryptionKey", {
                          required: showKeys ? "IV is required" : false,
                          pattern: {
                            value: /^[0-9,\[\]]*$/,
                            message: "Only numbers, commas, and brackets are allowed"
                          }
                        })}
                        onKeyDown={handleKeyDown}
                        className="w-full px-3 py-1 text-sm text-gray-100 bg-gray-800 border border-gray-600 rounded-md pr-10"
                      />
                      <button
                        type="button"
                        onClick={() => setShowDecryption(!showDecryption)}
                        className="absolute inset-y-0 right-0 flex items-center pr-3"
                      >
                        {showDecryption ? (
                          <EyeSlashIcon className="h-5 w-5 text-gray-400" />
                        ) : (
                          <EyeIcon className="h-5 w-5 text-gray-400" />
                        )}
                      </button>
                    </div>
                    {errors.decryptionKey && (
                      <p className="text-red-400 text-xs mt-1">{errors.decryptionKey.message}</p>
                    )}
                  </div>
                </div>
              )}
            </div>
            <div className="flex flex-col items-center">
              <button
                type="submit"
                disabled={!isFileValid || isUploaded}
                className={`w-full max-w-xs px-2 py-2 border rounded-md text-2sm font-medium transition-all duration-200 flex items-center justify-center space-x-2
                  ${isUploaded ? 'bg-green-600 border-green-400 text-white text-sm' : 'bg-gray-800 border-gray-600 text-gray-200'}
                  ${!isFileValid || isUploaded ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-750 hover:border-blue-400 hover:text-white'}`}
              >
                {isUploaded ? (
                  <>
                    <span>✓</span>
                    <span>Processing</span>
                  </>
                ) : (
                  <>
                    <span>⚡</span>
                    <span>Submit Data</span>
                  </>
                )}
              </button>
            </div>
            <div className="flex flex-col items-center">
              <button
                type="button"
                onClick={handleLayerStacking}
                disabled={isStacking}
                className={`w-full max-w-xs px-2 py-2 border rounded-md text-2sm font-medium transition-all duration-200 flex items-center justify-center space-x-2
                  ${isStacking ? 'bg-blue-600 border-blue-400 text-white text-sm' : 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-750 hover:border-blue-400 hover:text-white'}
                  ${isStacking ? 'opacity-50 cursor-not-allowed' : ''}`}
              >
                {isStacking ? (
                  <>
                    <span>🔄</span>
                    <span>Stacking Layers</span>
                  </>
                ) : (
                  <>
                    <span>📊</span>
                    <span>Layer Stacking</span>
                  </>
                )}
              </button>
            </div>
          </form>
          <div className="w-full text-center mt-4 pt-3 border-t border-gray-800">
            <p className="text-xs text-gray-500">• SpectraGen L0 Standard •</p>
          </div>
        </div>
      </div>
      {showDownloadModal && outputFiles.length > 0 && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
          <div className="bg-gray-800 rounded-lg p-6 max-w-4xl w-full mx-4 border border-gray-600">
            <div className="flex items-center justify-between mb-6">
              <h2 className="text-xl font-semibold text-blue-300">Download Images and JSON CONFIG</h2>
              <button
                onClick={() => setShowDownloadModal(false)}
                className="text-gray-400 hover:text-white text-2xl"
              >
                ×
              </button>
            </div>
            <div className="flex justify-center space-x-10">
              {outputFiles.map((file, index) => (
                <div
                  key={index}
                  className="flex flex-col items-center space-y-4"
                >
                  {file.type === 'image' ? (
                    <div className="w-44 h-44 bg-gray-700 rounded-lg flex items-center justify-center border border-gray-600">
                      <img
                        src={file.blobUrl}
                        alt={file.name}
                        className="w-40 h-40 object-contain rounded"
                      />
                    </div>
                  ) : (
                    <div className="w-44 h-44 bg-purple-600 rounded-lg flex items-center justify-center">
                      <FileText className="h-16 w-16 text-white" />
                    </div>
                  )}
                  <p className="text-base text-gray-200 text-center font-medium max-w-32 truncate">
                    {file.type === 'json' ? 'JSON FILE' : file.name}
                  </p>
                  <button
                    onClick={() => downloadFile(file.blob, file.name)}
                    className="bg-purple-600 hover:bg-purple-700 text-white py-2 px-4 rounded-lg flex items-center space-x-2 transition-colors"
                  >
                    <Download className="h-4 w-4" />
                    <span className="text-sm">Download</span>
                  </button>
                </div>
              ))}
            </div>
            <div className="flex justify-center mt-8">
              <button
                onClick={handleDownloadAll}
                className="bg-blue-600 hover:bg-blue-700 text-white py-3 px-6 rounded-lg text-base font-semibold flex items-center space-x-2 transition-colors shadow"
              >
                <Download className="h-5 w-5" />
                <span>Download All as ZIP</span>
              </button>
            </div>
          </div>
        </div>
      )}
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default L0Content;