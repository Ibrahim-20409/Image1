import { useEffect, useState } from "react";
import { GeoJSON } from "react-leaflet";

const SatelliteOrbitLayer = ({ satelliteName }) => {
  const [orbitGeoJSON, setOrbitGeoJSON] = useState(null);

  useEffect(() => {
    if (!satelliteName) return;

    const fetchOrbit = async () => {
      try {
        const res = await fetch(
          `/constellation/orbit?name=${encodeURIComponent(satelliteName)}&duration_minutes=90&step_seconds=60`
        );
        const data = await res.json();
        setOrbitGeoJSON(data);
      } catch (err) {
        console.error("Failed to load orbit:", err);
      }
    };

    fetchOrbit();
  }, [satelliteName]);

  if (!orbitGeoJSON) return null;

  return (
    <GeoJSON
      data={orbitGeoJSON}
      style={{
        color: "blue",
        weight: 2,
        opacity: 0.8,
      }}
    />
  );
};

export default SatelliteOrbitLayer;
