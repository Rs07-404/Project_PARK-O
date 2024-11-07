import React, { useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup } from 'react-leaflet';
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpot } from '../../types/ParkingSpot.type.ts'; // Import the types

// Fix for default marker icon in Leaflet
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ParkingMapProps {
  parkingSpots: ParkingSpot[];
}

const ParkingMap: React.FC<ParkingMapProps> = ({ parkingSpots }) => {
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);

  return (
    <MapContainer center={[17.6599, 75.9064]} zoom={12} style={{ height: "100vh", width: "100%" }}>
      <TileLayer
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
      />

      {parkingSpots.map((spot) => (
        <Marker
          key={spot._id}
          position={[spot.location.coordinates[1], spot.location.coordinates[0]]}
          eventHandlers={{
            click: () => setSelectedSpot(spot),
          }}
        >
          {selectedSpot && selectedSpot._id === spot._id && (
            <Popup onClose={() => setSelectedSpot(null)}>
              <div>
                <h4>Spot #{selectedSpot.spotNumber}</h4>
                <p>Status: {selectedSpot.status}</p>
              </div>
            </Popup>
          )}
        </Marker>
      ))}
    </MapContainer>
  );
};

export default ParkingMap;
