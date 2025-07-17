import React from "react";
import { MapContainer} from "react-leaflet";
import SatellitesStationLayer from "./SatellitesStationLayer.jsx";

const ConstellationMap = ({ sitesData, constellationData }) => {
  const center = [31, 71];

  return (
    <div className="h-full w-full">
      <MapContainer
        center={center}
        zoom={4}
        minZoom={3}
        // maxBounds={[
        //   [-60, -180],
        //   [60, 180],
        // ]}
        maxBoundsViscosity={1}
        worldCopyJump
        loadingControl
        attributionControl={false}
        style={{ height: "100%", width: "100%", zIndex: "0" }}
        className="border-7 border-gray-200 border-dashed rounded-none shadow-[0px_0px_5px_rgba(55,65,81,0.5)]"
      >

        {/* Satellite Station Overlay */}
        <SatellitesStationLayer
          sitesData={sitesData}
          constellationData={constellationData}
        />

      </MapContainer>
    </div>
  );
};

export default ConstellationMap;
