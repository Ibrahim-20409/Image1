import React, { useState, useEffect } from "react";

const TimeSlider = ({ epoch, current_time, playButtonAction }) => {
  const epochDate = new Date(epoch);
  const minTime = isNaN(epochDate.getTime()) ? Date.now() : epochDate.getTime();
  const maxTime = minTime + 14 * 24 * 60 * 60 * 1000;

  const [timerValue, setTimerValue] = useState(new Date().getTime());
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (current_time) {
      const currentTimeInMilliseconds = new Date(current_time).getTime();
      setTimerValue(currentTimeInMilliseconds);
    }
  }, [current_time]);

  const formatDateTime = (timestamp) => {
    return new Date(timestamp).toISOString();
  };

  const handleTimerChange = (e) => {
    const newTime = parseInt(e.target.value, 10);
    setTimerValue(newTime);
    sendUpdatedState(isPlaying, formatDateTime(newTime));
  };

  const handlePlayPause = () => {
    const newPlayState = !isPlaying;
    setIsPlaying(newPlayState);
    sendUpdatedState(newPlayState, formatDateTime(timerValue));
  };

  const handleSetToCurrentTime = () => {
    const currentTime = new Date().getTime();
    setTimerValue(currentTime);
    sendUpdatedState(isPlaying, formatDateTime(currentTime));
  };

  const sendUpdatedState = (playState, time) => {
    playButtonAction({
      wsaction: playState,
      time: time,
    });
  };

  const selectedDate = new Date(timerValue).toLocaleString("en-US", {
    weekday: "short",
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "numeric",
    minute: "numeric",
    second: "numeric",
  });

  return (
    <div className="relative p-1 ">
      <div className="flex items-center justify-between space-x-4 w-full h-14">
        {/* Play Button */}
        <div
          className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full border-2 border-gray-300 shadow-lg"
          onClick={handlePlayPause}
        >
          {!isPlaying ? (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="black" d="M8 5v14l11-7z" />
            </svg>
          ) : (
            <svg
              xmlns="http://www.w3.org/2000/svg"
              viewBox="0 0 24 24"
              width="24"
              height="24"
            >
              <path fill="black" d="M6 19h4V5H6zm8 0h4V5h-4z" />
            </svg>
          )}
        </div>

        {/* Clock Icon (Reset to Current Time) */}
        <div
          className="flex items-center justify-center w-10 h-10 cursor-pointer rounded-full border-2 border-gray-300 shadow-lg"
          onClick={handleSetToCurrentTime}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 24 24"
            width="24"
            height="24"
          >
            <path
              fill="black"
              d="M12 2a10 10 0 1 0 10 10A10 10 0 0 0 12 2zm1 14h-2v-5h4v2h-2z"
            />
          </svg>
        </div>

        {/* Time Slider */}
        <div className="flex-1 flex items-center">
          <input
            type="range"
            min={minTime}
            max={maxTime}
            step={60 * 1000}
            value={timerValue}
            onChange={handleTimerChange}
            className="w-full h-2 bg-gray-400 rounded-lg cursor-pointer"
          />
          <div className="text-center text-sm text-gray-600 mt-2">
            Time: {selectedDate}
          </div>
        </div>
      </div>
    </div>
  );
};

export default TimeSlider;
