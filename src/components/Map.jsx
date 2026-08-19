/* eslint-disable react/prop-types */
import { useNavigate } from "react-router-dom";
import styles from "./Map.module.css";
import {
  MapContainer,
  TileLayer,
  Marker,
  Popup,
  useMap,
  useMapEvents,
} from "react-leaflet";
import { useEffect, useState } from "react";
import { useCities } from "../contexts/CitiesContext";
import { useGeolocation } from "../hooks/useGeoLocation";
import Button from "./Button";
import useUrlPosition from "../hooks/useUrlPosition";

export default function Map() {
  const { cities } = useCities();
  const [mapPosition, setMapPosition] = useState([40, 0]);
  const {
    isLoading: isLoadingPosition,
    position: geoPosition,
    getPosition,
  } = useGeolocation();

  const [lat, lng] = useUrlPosition();

  useEffect(
    function () {
      if (lat && lng) setMapPosition([Number(lat), Number(lng)]);
    },
    [lat, lng],
  );

  useEffect(
    function () {
      if (geoPosition) {
        setMapPosition([geoPosition.lat, geoPosition.lng]);
      }
    },
    [geoPosition],
  );

  return (
    <div className={styles.mapContainer}>
      {!geoPosition && (
        <Button type="position" onClick={getPosition}>
          {isLoadingPosition ? "Loading..." : "Use your position"}
        </Button>
      )}
      <MapContainer
        className={styles.mapContainer}
        center={mapPosition}
        zoom={6}
        scrollWheelZoom={true}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.fr/hot/{z}/{x}/{y}.png"
        />
        {cities.map((city) => (
          <Marker
            position={[city.position.lat, city.position.lng]}
            key={city.id}
          >
            <Popup>
              <span>
                {city.emoji} {city.cityName}
              </span>
            </Popup>
          </Marker>
        ))}
        {lat && lng && <ChangeCenter position={mapPosition} />}
        <DetectClick />
      </MapContainer>
    </div>
  );
}

function DetectClick() {
  const navigate = useNavigate();
  useMapEvents({
    click: (e) => navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`),
  });
}
function ChangeCenter({ position }) {
  const map = useMap();
  map.setView(position);
  return null;
}
