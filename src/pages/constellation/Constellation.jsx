import React, { useEffect, useState, useRef, useCallback } from "react";
import ConstellationMap from "./ConstellationMap.jsx";
import TimeSlider from "./TimeSlider.jsx";

const Constellation = () => {
  const [sitesData, setSitesData] = useState([]);
  const [constellationData, setConstellationData] = useState({});
  const websckt = useRef(null);

  const handleWebSocketMessage = useCallback((e) => {
    try {
      const response = JSON.parse(e.data);
      if (response.key === "sites") {
        if (Array.isArray(response.value.data)) {
          setSitesData((prevSitesData) => {
            if (
              JSON.stringify(prevSitesData) !==
              JSON.stringify(response.value.data)
            ) {
              return response.value.data;
            }
            return prevSitesData;
          });
        }
      }

      if (response.key === "constellation") {
        if (typeof response.value === "object" && response.value !== null) {
          setConstellationData((prevConstellationData) => {
            if (
              JSON.stringify(prevConstellationData) !==
              JSON.stringify(response.value)
            ) {
              return response.value;
            }
            return prevConstellationData;
          });
        }
      }
    } catch (error) {
      console.error("Error parsing WebSocket message:", error);
    }
  }, []);

  useEffect(() => {
    const currentTime = new Date().toISOString();
    const url = `ws://localhost:8000/api/constellation/ws?time=${currentTime}`;
    websckt.current = new WebSocket(url);
    websckt.current.onmessage = handleWebSocketMessage;

    return () => {
      if (websckt.current) {
        websckt.current.close();
      }
    };
  }, [handleWebSocketMessage]);

  const handlePlayButton = (filterData) => {
    const { wsaction, time } = filterData;
    if (!websckt.current && wsaction === true) {
      const url = `ws://localhost:8000/api/constellation/ws?time=${time}`;
      websckt.current = new WebSocket(url);
      websckt.current.onmessage = handleWebSocketMessage;
    } else if (wsaction === false && websckt.current) {
      websckt.current.close();
      websckt.current = null;
      return;
    } else if (
      wsaction === true &&
      websckt.current &&
      websckt.current.readyState === WebSocket.OPEN
    ) {
      websckt.current.send(JSON.stringify({ time }));
    }
  };

  return (
    <div >
      <div className="h-[calc(100vh-141px)] ">
        <ConstellationMap
          sitesData={sitesData}
          constellationData={constellationData}
          s
        />
      </div>
      <div className="bg-[#CBCBCB]">
        <TimeSlider
          epoch={constellationData.epoch}
          current_time={constellationData.current_time}
          playButtonAction={handlePlayButton}
        />
      </div>
    </div>
  );
};

export default Constellation;
