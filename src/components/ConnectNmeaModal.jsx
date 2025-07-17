import React, { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { useNmea } from "../context/NmeaContext"; // Adjust path as needed

const ConnectNmeaModal = ({ closeModal }) => {
  const [selectedTab, setSelectedTab] = useState("Settings");
  const { dataMode, setDataMode } = useNmea(); // Access context
  const { nmeaData } = useNmea(); // Access the shared data
  const { register, handleSubmit, watch, setValue } = useForm();

  // Update form fields when dataMode changes
  useEffect(() => {
    if (dataMode) {
      Object.keys(dataMode).forEach((key) => {
        setValue(key, dataMode[key]); // Update form fields
      });
    }
  }, [dataMode, setValue]);

  const watchDataOption = watch("deliveryOption");

  const onSubmit = (data) => {
    console.log("Form Submitted:", data);
    setDataMode(data); // Update context state
  };

  return (
    <div className="fixed inset-0 bg-gray-800 bg-opacity-50 flex justify-center items-center z-50">
      <div className="relative rounded-lg border border-gray-100 text-center shadow-xl bg-white">
        <button
          className="absolute -end-1 -top-1 rounded-full border border-gray-300 bg-gray-100 p-1"
          onClick={closeModal}
        >
          <span className="sr-only">Close</span>
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="size-3"
            viewBox="0 0 20 20"
            fill="currentColor"
          >
            <path
              fillRule="evenodd"
              d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z"
              clipRule="evenodd"
            />
          </svg>
        </button>

        <div className="grid grid-cols-1 p-4">
          <div>
            <div className="sm:hidden">
              <label className="sr-only">Tab</label>
              <select
                id="Tab"
                className="w-full rounded-md border-gray-200"
                onChange={(e) => setSelectedTab(e.target.value)}
                value={selectedTab}
              >
                <option>Realtime</option>
                <option>Settings</option>
                <option>Actions</option>
                <option>Data Stream</option>
              </select>
            </div>

            <div className="hidden sm:block">
              <div className="border-b border-gray-200">
                <nav className="-mb-px flex gap-6" aria-label="Tabs">
                  <a
                    className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
                      selectedTab === "Realtime"
                        ? "border-sky-500 text-sky-600"
                        : "border-transparent text-gray-500"
                    } px-1 pb-4 text-sm font-medium hover:border-gray-300 hover:text-gray-700 cursor-pointer`}
                    onClick={() => setSelectedTab("Realtime")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M2.25 13.5h3.86a2.25 2.25 0 012.012 1.244l.256.512a2.25 2.25 0 002.013 1.244h3.218a2.25 2.25 0 002.013-1.244l.256-.512a2.25 2.25 0 012.013-1.244h3.859m-19.5.338V18a2.25 2.25 0 002.25 2.25h15A2.25 2.25 0 0021.75 18v-4.162c0-.224-.034-.447-.1-.661L19.24 5.338a2.25 2.25 0 00-2.15-1.588H6.911a2.25 2.25 0 00-2.15 1.588L2.35 13.177a2.25 2.25 0 00-.1.661z"
                      />
                    </svg>
                    Realtime
                  </a>
                  <a
                    className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
                      selectedTab === "Settings"
                        ? "border-sky-500 text-sky-600"
                        : "border-transparent text-gray-500"
                    } px-1 pb-4 text-sm font-medium hover:border-gray-300 hover:text-gray-700 cursor-pointer`}
                    onClick={() => setSelectedTab("Settings")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M10.343 3.94c.09-.542.56-.94 1.11-.94h1.093c.55 0 1.02.398 1.11.94l.149.894c.07.424.384.764.78.93.398.164.855.142 1.205-.108l.737-.527a1.125 1.125 0 011.45.12l.773.774c.39.389.44 1.002.12 1.45l-.527.737c-.25.35-.272.806-.107 1.204.165.397.505.71.93.78l.893.15c.543.09.94.56.94 1.109v1.094c0 .55-.397 1.02-.94 1.11l-.893.149c-.425.07-.765.383-.93.78-.165.398-.143.854.107 1.204l.527.738c.32.447.269 1.06-.12 1.45l-.774.773a1.125 1.125 0 01-1.449.12l-.738-.527c-.35-.25-.806-.272-1.203-.107-.397.165-.71.505-.781.929l-.149.894c-.09.542-.56.94-1.11.94h-1.094c-.55 0-1.019-.398-1.11-.94l-.148-.894c-.071-.424-.384-.764-.781-.93-.398-.164-.854-.142-1.204.108l-.738.527c-.447.32-1.06.269-1.45-.12l-.773-.774a1.125 1.125 0 01-.12-1.45l.527-.737c.25-.35.273-.806.108-1.204-.165-.397-.505-.71-.93-.78l-.894-.15c-.542-.09-.94-.56-.94-1.109v-1.094c0-.55.398-1.02.94-1.11l.894-.149c.424-.07.765-.383.93-.78.165-.398.143-.854-.107-1.204l-.527-.738a1.125 1.125 0 01.12-1.45l.773-.773a1.125 1.125 0 011.45-.12l.737.527c.35.25.807.272 1.204.107.397-.165.71-.505.78-.929l.15-.894z"
                      />
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M15 12a3 3 0 11-6 0 3 3 0 016 0z"
                      />
                    </svg>
                    Settings
                  </a>

                  <a
                    className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
                      selectedTab === "Actions"
                        ? "border-sky-500 text-sky-600"
                        : "border-transparent text-gray-500"
                    } px-1 pb-4 text-sm font-medium hover:border-gray-300 hover:text-gray-700 cursor-pointer`}
                    onClick={() => setSelectedTab("Actions")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                      />
                    </svg>
                    Actions
                  </a>
                  <a
                    className={`inline-flex shrink-0 items-center gap-2 border-b-2 ${
                      selectedTab === "Messages"
                        ? "border-sky-500 text-sky-600"
                        : "border-transparent text-gray-500"
                    } px-1 pb-4 text-sm font-medium hover:border-gray-300 hover:text-gray-700 cursor-pointer`}
                    onClick={() => setSelectedTab("Messages")}
                  >
                    <svg
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                      strokeWidth="1.5"
                      stroke="currentColor"
                      className="size-5"
                    >
                      <path
                        strokeLinecap="round"
                        strokeLinejoin="round"
                        d="M14.857 17.082a23.848 23.848 0 005.454-1.31A8.967 8.967 0 0118 9.75v-.7V9A6 6 0 006 9v.75a8.967 8.967 0 01-2.312 6.022c1.733.64 3.56 1.085 5.455 1.31m5.714 0a24.255 24.255 0 01-5.714 0m5.714 0a3 3 0 11-5.714 0M3.124 7.5A8.969 8.969 0 015.292 3m13.416 0a8.969 8.969 0 012.168 4.5"
                      />
                    </svg>
                    Data Stream
                  </a>
                </nav>
              </div>
            </div>

            <div className="">
              {selectedTab === "Realtime" && (
                <div className="space-y-4 flex justify-center items-center">
                  <fieldset className="space-y-4">
                    <div className="w-60">
                      <label
                        className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-xs hover:border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                        title="Data is being fetched from past recorded dates for the selected site." // Tooltip text here
                      >
                        <div className="flex-1">
                          <h3 className="text-gray-900 dark:text-white">
                            Archived
                          </h3>
                        </div>
                        <input
                          type="radio"
                          name="deliveryOption"
                          value="archived"
                          id="archived"
                          className="size-5 border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
                          {...register("deliveryOption")}
                        />
                      </label>
                    </div>
                    <div className="w-60">
                      <label
                        className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-xs hover:border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                        title="Receiver data is being fetched live from the database. These results are more accurate but user can experience the delay due to Network Latency."
                      >
                        <div className="flex-1">
                          <h3 className=" text-gray-900 dark:text-white">
                            Database
                          </h3>
                        </div>
                        <input
                          type="radio"
                          name="deliveryOption"
                          value="database"
                          id="database"
                          className="size-5 border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
                          {...register("deliveryOption")}
                        />
                      </label>
                    </div>

                    <div className="w-60">
                      <label
                        className="flex cursor-pointer justify-between gap-4 rounded-lg border border-gray-100 bg-white p-2 text-sm font-medium shadow-xs hover:border-gray-200 dark:border-gray-800 dark:bg-gray-900 dark:hover:border-gray-700"
                        title="Data is being fetched from the Reciever. These results are less accurate. Please Configure the Data Stream Carefully. This Data won't be recorded for future use."
                      >
                        <div className="flex-1">
                          <h3 className="text-gray-900 dark:text-white">
                            Reciever
                          </h3>
                        </div>
                        <input
                          type="radio"
                          name="deliveryOption"
                          value="reciever"
                          id="reciever"
                          className="size-5 border-gray-300 text-blue-500 dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
                          {...register("deliveryOption")}
                        />
                      </label>
                    </div>

                    {/* Conditionally render the IP Address input field */}
                    {watchDataOption === "reciever" && (
                      <div className="w-60 mt-4">
                        <input
                          type="text"
                          placeholder="IP Address: "
                          className="w-full p-1 rounded-lg border border-gray-300 text-sm dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
                          {...register("ipAddress")}
                        />
                      </div>
                    )}
                  </fieldset>
                </div>
              )}

              {selectedTab === "Settings" && (
                <form
                  onSubmit={handleSubmit(onSubmit)}
                  className="space-y-4 flex justify-center items-center"
                >
                  <fieldset className="space-y-4">
                    {watchDataOption !== "archived" && (
                      <div className="flex flex-col text-gray-700">
                        <p>Fields apply only to archived data.</p>
                      </div>
                    )}

                    <div className="flex flex-col">
                      <label className="text-sm text-gray-700">
                        Start Time
                      </label>
                      <input
                        id="start-time"
                        type="datetime-local"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
                        {...register("startTime")}
                        disabled={watchDataOption !== "archived"}
                      />
                    </div>

                    {/* End Time Input */}
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-700">End Time</label>
                      <input
                        id="end-time"
                        type="datetime-local"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
                        {...register("endTime")}
                        disabled={watchDataOption !== "archived"}
                      />
                    </div>

                    {/* Playback Speed Dropdown */}
                    <div className="flex flex-col">
                      <label className="text-sm text-gray-700">
                        Playback Speed
                      </label>
                      <select
                        id="playback-speed"
                        className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg p-2 focus:ring-blue-500 focus:border-blue-500 dark:text-white dark:border-gray-700 dark:bg-gray-800 dark:ring-offset-gray-900"
                        {...register("playbackSpeed")}
                        disabled={watchDataOption !== "archived"}
                      >
                        <option value="1">1x</option>
                        <option value="2">2x</option>
                        <option value="5">5x</option>
                        <option value="10">10x</option>
                      </select>
                    </div>
                  </fieldset>
                </form>
              )}

              {selectedTab === "Actions" && (
                <div className="space-y-4 flex flex-col items-center justify-center text-center">
                  <button
                    type="submit"
                    onClick={handleSubmit(onSubmit)} // Ensuring form submission
                    className="group flex items-center justify-between gap-4 rounded-lg border border-indigo-600 bg-indigo-600 px-5 py-2 transition-colors hover:bg-transparent focus:ring-3 focus:outline-none"
                  >
                    <span className="font-medium text-white transition-colors group-hover:text-indigo-600">
                      Start/ Stop
                    </span>

                    <span className="shrink-0 rounded-full border border-current bg-white p-2 text-indigo-600">
                      <svg
                        className="size-5"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                      >
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth="2"
                          d="M4 6c0-2.21 4-4 8-4s8 1.79 8 4m-16 0v12c0 2.21 4 4 8 4s8-1.79 8-4V6m-16 0c0 2.21 4 4 8 4s8-1.79 8-4"
                        />
                      </svg>
                    </span>
                  </button>

                  {/* <p className="text-gray-500">
                    See the next tab. If the reciever is properly Configured a
                    Navigation Data will appear.
                  </p> */}
                </div>
              )}

              {selectedTab === "Messages" && (
                <div className="flex flex-col items-center justify-center text-center space-y-4">
                  {/* Heading */}
                  <h1 className="font-bold italic text-xl">NMEA Data</h1>

                  {/* Card Container */}
                  <div className="border border-gray-400 rounded-lg p-4 w-96 h-20 overflow-y-auto">
                    {nmeaData.length > 0 ? (
                      <ul className="space-y-2">
                        {nmeaData.map((data, index) => (
                          <li key={index} className="text-gray-700">
                            {data}
                          </li>
                        ))}
                      </ul>
                    ) : (
                      <p className="text-gray-500">No NMEA data available.</p>
                    )}
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ConnectNmeaModal;
