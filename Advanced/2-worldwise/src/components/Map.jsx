import { useNavigate } from "react-router-dom";
import {
    MapContainer,
    Marker,
    Popup,
    TileLayer,
    useMap,
    useMapEvent,
} from "react-leaflet";
import { useEffect, useState } from "react";
import style from "../css-modules/Map.module.css";
import { useCities } from "../contexts/CitiesContext";
import useURLPosition from "../hooks/useURLPosition";
// import { useGeolocation } from "../hooks/useGeolocation";
function MapComponent() {
    const { cities } = useCities();
    const [mapPosition, setMapPosition] = useState([51.505, -0.09]);
    const [latitude, longitude] = useURLPosition();

    // Use the below code to calculate user's current location
    // const { isLoading, position, error, getPosition } = useGeolocation();

    useEffect(() => {
        if (latitude && longitude) setMapPosition([latitude, longitude]);
    }, [latitude, longitude]);

    return (
        <div className={style.mapContainer}>
            {/* The below JSX is copied from the react-leafletdocumentation to display map */}
            <MapContainer
                center={mapPosition}
                zoom={4}
                scrollWheelZoom={true}
                className={style.map}
            >
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                {cities.map((city) => (
                    <Marker
                        key={city.id}
                        position={[city.position.lat, city.position.lng]}
                    >
                        <Popup>
                            <span>{city.emoji}</span>
                            {city.cityName}
                        </Popup>
                    </Marker>
                ))}
                <ChangeCenter position={mapPosition} />
                <DetectClick setMapPosition={setMapPosition} />
            </MapContainer>
        </div>
    );
}

function ChangeCenter({ position }) {
    const map = useMap();
    map.setView(position);
    return null;
}

function DetectClick({ setMapPosition }) {
    const navigate = useNavigate();
    useMapEvent({
        click: (e) => {
            setMapPosition([e.latlng.lat, e.latlng.lng]);
            navigate(`form?lat=${e.latlng.lat}&lng=${e.latlng.lng}`);
        },
    });
}

export default MapComponent;
