import { createContext, useContext, useState, useEffect } from "react";

const NmeaContext = createContext();

export const NmeaProvider = ({ children }) => {
  const [nmeaData, setNmeaData] = useState([]);
  const [siteCoordinates, setSiteCoordinates] = useState(null); // Set initially to null
  const [dataMode, setDataMode] = useState({
    deliveryOption: "database",
    ipAddress: "",
    startTime: "",
    endTime: "",
    playbackSpeed: "1",
  });
  const [connectionStatus, setConnectionStatus] = useState(false);
  const [initialCoordinates, setInitialCoordinates] = useState([]); // Store first 50 values

  useEffect(() => {
    let ws;

    if (dataMode.deliveryOption === "reciever" && dataMode.ipAddress) {
      const wsUrl = `ws://${dataMode.ipAddress}:7878`;
      ws = new WebSocket(wsUrl);

      ws.onopen = () => {
        console.log("WebSocket connected to", wsUrl);
        setConnectionStatus(true);
      };

      ws.onmessage = (event) => {
        try {
          const message = event.data.trim();
          const sentences = message.split(/\r?\n|\r| /);
          setNmeaData(sentences);

          // Parse GGA sentences for lat/lon
          sentences.forEach((sentence) => {
            if (sentence.startsWith("$GPGGA")) {
              const parsed = parseGGA(sentence);
              if (parsed) {
                updateInitialCoordinates(parsed.lat, parsed.lon);
              }
            }
          });
        } catch (error) {
          console.error("Error parsing WebSocket message:", error);
        }
      };

      ws.onerror = (error) => {
        console.error("WebSocket Error:", error);
      };

      ws.onclose = () => {
        console.log("WebSocket disconnected");
        setConnectionStatus(false);
      };
    } else {
      setConnectionStatus(false);
    }

    return () => {
      if (ws) {
        ws.close();
      }
    };
  }, [dataMode]);

  // Function to parse GGA sentence
  const parseGGA = (sentence) => {
    const parts = sentence.split(",");
    if (parts.length <= 9) return null;

    const rawLat = parseFloat(parts[2]);
    const rawLon = parseFloat(parts[4]);
    if (isNaN(rawLat) || isNaN(rawLon)) return null;

    return {
      lat: convertToDecimal(rawLat, parts[3]),
      lon: convertToDecimal(rawLon, parts[5]),
    };
  };

  // Function to convert lat/lon to decimal format
  const convertToDecimal = (value, direction) => {
    if (!value) return null;
    const valueStr = value.toString().padStart(6, "0");
    const deg = parseFloat(valueStr.slice(0, 2));
    const min = parseFloat(valueStr.slice(2)) / 60;
    let decimal = deg + min;
    if (direction === "S" || direction === "W") decimal *= -1;
    return decimal;
  };

  // Function to update initial coordinates and compute average after 50 samples
  const updateInitialCoordinates = (lat, lon) => {
    setInitialCoordinates((prev) => {
      if (prev.length < 50) {
        const newCoords = [...prev, { lat, lon }];
        if (newCoords.length === 50) {
          const avgLat =
            newCoords.reduce((sum, item) => sum + item.lat, 0) / 50;
          const avgLon =
            newCoords.reduce((sum, item) => sum + item.lon, 0) / 50;
          setSiteCoordinates({
            latitude: avgLat,
            longitude: avgLon,
            altitude: 525,
          });
          console.log("Site coordinates set:", {
            latitude: avgLat,
            longitude: avgLon,
          });
        }
        return newCoords;
      }
      return prev; // Stop updating after 50 values
    });
  };

  return (
    <NmeaContext.Provider
      value={{
        nmeaData,
        setNmeaData,
        dataMode,
        setDataMode,
        connectionStatus,
        siteCoordinates,
      }}
    >
      {children}
    </NmeaContext.Provider>
  );
};

export const useNmea = () => useContext(NmeaContext);
