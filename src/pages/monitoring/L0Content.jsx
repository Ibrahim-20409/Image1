import React, { useState, useRef, useEffect } from "react";
import { useForm } from "react-hook-form";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { EyeIcon, EyeSlashIcon } from '@heroicons/react/24/outline';
import { FolderIcon } from '@heroicons/react/24/solid';

interface L0ContentProps {
  onComplete: () => void;
}

const L0Content: React.FC<L0ContentProps> = ({ onComplete }) => {
  const toastId = useRef<any>(null);
  const [showKeys, setShowKeys] = useState(false);
  const [isUploaded, setIsUploaded] = useState(false);
  const [isStacking, setIsStacking] = useState(false);
  const [fileError, setFileError] = useState("");
  const [isFileValid, setIsFileValid] = useState(false);
  const [showEncryption, setShowEncryption] = useState(false);
  const [showDecryption, setShowDecryption] = useState(false);

  const {
    register,
    handleSubmit,
    watch,
    unregister,
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

  const allowedCharacters = '0123456789[],';

  const handleKeyDown = (event: React.KeyboardEvent) => {
    if (event.key.length === 1 && !allowedCharacters.includes(event.key)) {
      event.preventDefault();
    }
  };

  useEffect(() => {
    if (showKeys) {
      register("encryptionKey", {
        required: "Key is required",
        pattern: {
          value: /^[0-9,\[\]]*$/,
          message: "Only numbers, commas, and brackets are allowed"
        }
      });
      register("decryptionKey", {
        required: "IV is required",
        pattern: {
          value: /^[0-9,\[\]]*$/,
          message: "Only numbers, commas, and brackets are allowed"
        }
      });
    } else {
      unregister("encryptionKey");
      unregister("decryptionKey");
    }
  }, [showKeys, register, unregister]);

  const onSubmit = async (data: any) => {
    if (!isFileValid || !data.file) {
      toast.error("Please select a valid BIN file", { theme: "dark" });
      return;
    }

    setIsUploaded(true);
    setFileError("");

    const formData = new FormData();
    formData.append("file", data.file[0]);

    if (showKeys) {
      formData.append("encryptionKey", data.encryptionKey);
      formData.append("ivKey", data.decryptionKey);
    }

    // Mock API call
    toastId.current = toast.info("Processing file...", {
      theme: "dark",
      autoClose: false,
      isLoading: true,
    });

    // Simulate processing time
    setTimeout(() => {
      toast.update(toastId.current, {
        render: "Processing complete! Images and config extracted.",
        type: "success",
        isLoading: false,
        autoClose: 3000,
        theme: "dark",
      });
      setIsUploaded(false);
      
      // Call onComplete to trigger the data display
      if (onComplete) onComplete();
    }, 2000);
  };

  const handleLayerStacking = () => {
    setIsStacking(true);
    setTimeout(() => setIsStacking(false), 2000);
  };

  return (
    <div className="flex justify-center w-full pt-4">
      <div className="flex flex-col items-center space-y-4 p-6 rounded-lg bg-gray-900 text-gray-100 w-full max-w-md border border-gray-700 shadow-sm">
        <div className="w-full text-center mb-3">
          <h2 className="text-lg font-semibold text-blue-300 tracking-tight">L0 Product</h2>
          <p className="text-xs text-gray-400">Raw Data Processing</p>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4 w-full">
          {/* BIN File Upload */}
          <div className="flex flex-col items-center">
            <label
              htmlFor="file"
              className="relative w-38 h-40 bg-gray-800 hover:bg-gray-700 border border-gray-600 hover:border-green-400 text-gray-200 hover:text-white text-sm font-medium rounded-lg transition-all duration-200 flex flex-col items-center justify-center cursor-pointer"
            >
              <FolderIcon className="w-20 h-16 text-gray-400 mb-2" />
              <div className="w-full px-2 flex items-center justify-between mt-1">
                <span style={{ fontSize: "14px" }} className="italic text-gray-300">
                  &nbsp;&nbsp;&nbsp;&nbsp; Click to <br /> add Bin File
                </span>
                <div className="w-8 h-8 rounded-full bg-black flex items-center justify-center">
                  <span className="text-white text-3xl leading-none">+</span>
                </div>
              </div>
            </label>
            <input 
              id="file" 
              type="file" 
              {...register("file", { required: true })} 
              className="hidden" 
              accept=".bin"
            />
            {selectedFile?.[0] && (
              <div className="mt-2 w-full max-w-xs bg-gray-800 p-2 rounded-md border border-gray-700">
                <p className="text-xs text-green-400 text-center truncate">
                  {selectedFile[0]?.name}
                </p>
              </div>
            )}
            {fileError && <p className="text-xs text-amber-400 mt-1 text-center w-full">{fileError}</p>}
          </div>

          {/* Encryption Section */}
          <div className="w-full mt-4 border-t border-gray-800 pt-4">
            <p className="text-m font-semibold text-blue-300 mb-2 text-center">Encryption Settings</p>

            <div className="flex items-center space-x-2 mb-3">
              <input
                type="checkbox"
                id="toggleKeys"
                checked={showKeys}
                onChange={(e) => setShowKeys(e.target.checked)}
                className="form-checkbox h-4 w-4 text-blue-400"
              />
              <label htmlFor="toggleKeys" className="text-xs text-gray-300 text-center">
                Provide Security Keys
              </label>
            </div>

            {showKeys && (
              <div className="space-y-3">
                {/* Encryption Key */}
                <div>
                  <label htmlFor="encryption" className="block text-xs text-gray-300 mb-1">Key</label>
                  <div className="relative">
                    <input
                      id="encryption"
                      type={showEncryption ? 'text' : 'password'}
                      placeholder="Enter key"
                      {...register("encryptionKey")}
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
                    <p className="text-red-400 text-xs">{errors.encryptionKey.message}</p>
                  )}
                </div>

                {/* IV Key */}
                <div>
                  <label htmlFor="decryption" className="block text-xs text-gray-300 mb-1">IV</label>
                  <div className="relative">
                    <input
                      id="decryption"
                      type={showDecryption ? 'text' : 'password'}
                      placeholder="Enter IV"
                      {...register("decryptionKey")}
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
                    <p className="text-red-400 text-xs">{errors.decryptionKey.message}</p>
                  )}
                </div>
              </div>
            )}
          </div>

          {/* Submit Button */}
          <div className="flex flex-col items-center">
            <button
              type="submit"
              disabled={!isFileValid}
              className={`w-full max-w-xs px-2 py-2 border rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2
                ${isUploaded ? 'bg-green-600 border-green-400 text-white' : 'bg-gray-800 border-gray-600 text-gray-200'}
                ${!isFileValid ? 'opacity-50 cursor-not-allowed' : 'hover:bg-gray-750 hover:border-blue-400 hover:text-white'}`}
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

          {/* Layer Stacking */}
          <div className="flex flex-col items-center">
            <button
              type="button"
              onClick={handleLayerStacking}
              className={`w-full max-w-xs px-2 py-2 border rounded-md text-sm font-medium transition-all duration-200 flex items-center justify-center space-x-2
                ${isStacking ? 'bg-blue-600 border-blue-400 text-white' : 'bg-gray-800 border-gray-600 text-gray-200 hover:bg-gray-750 hover:border-blue-400 hover:text-white'}`}
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
      <ToastContainer position="bottom-right" theme="dark" />
    </div>
  );
};

export default L0Content;