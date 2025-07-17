import React, { useState } from "react";
import {
  Popup,
  LayersControl,
  LayerGroup,
  Marker,
  useMapEvent,
  Polyline,
  GeoJSON,
  TileLayer,
} from "react-leaflet";
import Pakistan from "../../assets/geojson/Pakistan.json";
import {
  iconBeidouSatellite,
  iconGalileoSatellite,
  iconGlonassSatellite,
  iconGpsSatellite,
} from "../../assets/icons/iconStates";

const SatellitesStationLayer = ({ constellationData }) => {
  const [setSelectedLayers] = useState(
    new Set(["Sites", "Satellites", "Coverage"])
  );

  const [siteConnections] = useState({});
  const [filterOptions] = useState({
    gps: true,
    beidou: true,
    glonass: true,
    galileo: true,
    dop: "HDOP",
    grid: 2,
    elevation: 10,
  });
  const MapEventListener = () => {
    useMapEvent("overlayadd", (e) => handleLayerChange(e, e.name));
    useMapEvent("overlayremove", (e) => handleLayerChange(e, e.name));
    return null;
  };
  const handleLayerChange = (event, layerName) => {
    setSelectedLayers((prevLayers) => {
      const updatedLayers = new Set(prevLayers);

      if (event.type === "overlayadd") {
        updatedLayers.add(layerName);
       
      } else if (event.type === "overlayremove") {
        updatedLayers.delete(layerName);
       
      }
      return updatedLayers;
    });
  };
  return (
    <div className="h-full w-full relative">
      <MapEventListener />

      <LayersControl
        position="topright"
        onOverlayAdd={(e) => handleLayerChange(e, e.name)}
        onOverlayRemove={(e) => handleLayerChange(e, e.name)}
      >
{/* Google Hybrid (Satellite + Roads) */}
<LayersControl.BaseLayer name="Google Hybrid">
  <TileLayer
    url="http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
    subdomains={["mt0", "mt1", "mt2", "mt3"]}/>
</LayersControl.BaseLayer>        
{/* Default OpenStreetMap */}
<LayersControl.BaseLayer checked name="OpenStreetMap">
  <TileLayer url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png" />
</LayersControl.BaseLayer>

{/* Night Mode - Dark Themed Map */}
<LayersControl.BaseLayer name="Night Mode (Dark)">
  <TileLayer
    url="https://{s}.basemaps.cartocdn.com/dark_all/{z}/{x}/{y}{r}.png"
    attribution="&copy; CartoDB"
  />
</LayersControl.BaseLayer>

{/* Google Satellite */}
<LayersControl.BaseLayer name="Google Satellite">
  <TileLayer
    url="http://{s}.google.com/vt/lyrs=s&x={x}&y={y}&z={z}"
    subdomains={["mt0", "mt1", "mt2", "mt3"]}
  />
</LayersControl.BaseLayer>

{/* Google Hybrid (Satellite + Roads) */}
<LayersControl.BaseLayer name="Google Hybrid">
  <TileLayer
    url="http://{s}.google.com/vt/lyrs=y&x={x}&y={y}&z={z}"
    subdomains={["mt0", "mt1", "mt2", "mt3"]}
  />
</LayersControl.BaseLayer>

{/* ESRI World Terrain */}
<LayersControl.BaseLayer name="Terrain (Esri)">
  <TileLayer
    url="https://server.arcgisonline.com/ArcGIS/rest/services/World_Terrain_Base/MapServer/tile/{z}/{y}/{x}"
    attribution="Tiles &copy; Esri &mdash; Source: USGS, NASA"
  />
</LayersControl.BaseLayer>
        <LayersControl.Overlay name="Boundary">
          <LayerGroup>
            <GeoJSON data={Pakistan} />
          </LayerGroup>
        </LayersControl.Overlay>

        <LayersControl.Overlay checked name="Satellites">
          <LayerGroup>
            {["gps", "beidou", "glonass", "galileo"].map((type) =>
              Array.isArray(constellationData[type]) &&
              filterOptions[type] &&
              constellationData[type].length > 0
                ? constellationData[type].map((site) => (
                    <Marker
                      key={site.name}
                      position={[
                        site.coordinates2D.latitude,
                        site.coordinates2D.longitude,
                      ]}
                      icon={
                        type === "gps"
                          ? iconGpsSatellite
                          : type === "beidou"
                          ? iconBeidouSatellite
                          : type === "glonass"
                          ? iconGlonassSatellite
                          : iconGalileoSatellite
                      }
                    >
                      <Popup>
                        <strong>{site.name}</strong>
                      </Popup>
                    </Marker>
                  ))
                : null
            )}
          </LayerGroup>
        </LayersControl.Overlay>
        <LayersControl.Overlay checked name="Coverage">
          <LayerGroup>
            {Object.keys(siteConnections).map((siteName) => {
              const siteData = siteConnections[siteName];
              if (siteData.visible) {
                return siteData.connections.map((connection, index) => {
                  let lineColor = "#000000"; // Default color
                  switch (connection.constellationType) {
                    case "gps":
                      lineColor = "#EF6A00";
                      break;
                    case "beidou":
                      lineColor = "#C70087";
                      break;
                    case "galileo":
                      lineColor = "#003968";
                      break;
                    case "glonass":
                      lineColor = "#8C5D2B";
                      break;
                    default:
                      lineColor = "#000000"; // Fallback
                  }

                  return (
                    <Polyline
                      key={index}
                      positions={[
                        connection.siteCoords,
                        connection.satelliteCoords,
                      ]}
                      color={lineColor}
                      weight={2}
                      opacity={0.6}
                      dashArray="5,5"
                    />
                  );
                });
              }
              return null;
            })}
          </LayerGroup>
        </LayersControl.Overlay>
        
      </LayersControl>
    </div>
  );
};

export default SatellitesStationLayer;
