import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, CircleMarker } from 'react-leaflet';
import 'leaflet/dist/leaflet.css';
import L from 'leaflet';
import icon from 'leaflet/dist/images/marker-icon.png';
import iconShadow from 'leaflet/dist/images/marker-shadow.png';
import { Locate } from 'lucide-react';

// Fix for default Leaflet icon not showing in React
let DefaultIcon = L.icon({
    iconUrl: icon,
    shadowUrl: iconShadow,
    iconSize: [25, 41],
    iconAnchor: [12, 41]
});

L.Marker.prototype.options.icon = DefaultIcon;

// Component to handle map centering
const ChangeView = ({ center, zoom }) => {
    const map = useMap();
    useEffect(() => {
        map.setView(center, zoom);
    }, [center, zoom, map]);
    return null;
};

const Map = ({ cafes, onMarkerClick, onLocate }) => {
    // Default center if no cafes (Central Park, NY)
    const defaultCenter = [40.7812, -73.9665];

    // Calculate center based on cafes if available
    const [center, setCenter] = useState(defaultCenter);
    const [userLocation, setUserLocation] = useState(null);
    const [locating, setLocating] = useState(false);

    useEffect(() => {
        // Only update center from cafes if we are NOT currently tracking a user location interaction
        // Or just initial load
        if (cafes.length > 0 && !userLocation) {
            setCenter([cafes[0].coordinates.lat, cafes[0].coordinates.lng]);
        }
    }, [cafes]);

    const handleLocateMe = () => {
        setLocating(true);
        if (!navigator.geolocation) {
            alert("Geolocation is not supported by your browser");
            setLocating(false);
            return;
        }

        navigator.geolocation.getCurrentPosition(
            (position) => {
                const { latitude, longitude } = position.coords;
                const newCenter = [latitude, longitude];
                setUserLocation(newCenter);
                setCenter(newCenter);
                setLocating(false);
                if (onLocate) {
                    onLocate(latitude, longitude);
                }
            },
            () => {
                alert("Unable to retrieve your location");
                setLocating(false);
            }
        );
    };

    return (
        <div className="w-full h-full rounded-xl overflow-hidden shadow-lg border border-gray-200 z-0 relative group">
            {/* Locate Me Button Overlay */}
            <div className="absolute top-4 right-4 z-[500]">
                <button
                    onClick={handleLocateMe}
                    disabled={locating}
                    className="bg-white p-2 rounded-lg shadow-md hover:bg-gray-100 transition-colors border border-gray-300 disabled:opacity-50 text-gray-700 flex items-center justify-center"
                    title="Locate Me"
                >
                    <Locate className={`w-6 h-6 ${locating ? 'animate-spin text-amber-600' : ''}`} />
                </button>
            </div>

            <MapContainer
                center={center}
                zoom={13}
                scrollWheelZoom={false}
                className="h-full w-full"
                style={{ height: '100%', width: '100%' }}
            >
                <ChangeView center={center} zoom={13} />
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />

                {/* User Location Marker */}
                {userLocation && (
                    <CircleMarker
                        center={userLocation}
                        radius={8}
                        pathOptions={{ color: 'white', fillColor: '#2563eb', fillOpacity: 0.8, weight: 2 }}
                    >
                        <Popup>You are here</Popup>
                    </CircleMarker>
                )}

                {cafes.map((cafe) => (
                    <Marker
                        key={cafe.id}
                        position={[cafe.coordinates.lat, cafe.coordinates.lng]}
                        eventHandlers={{
                            click: () => {
                                if (onMarkerClick) onMarkerClick(cafe);
                            },
                        }}
                    >
                        <Popup>
                            <div className="text-center">
                                <h3 className="font-bold text-sm">{cafe.name}</h3>
                                <p className="text-xs text-gray-500">{cafe.rating} ★</p>
                            </div>
                        </Popup>
                    </Marker>
                ))}
            </MapContainer>
        </div>
    );
};

export default Map;
