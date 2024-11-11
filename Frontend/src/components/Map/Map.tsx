import React, { useEffect, useState } from 'react';
import { MapContainer, TileLayer, Marker, Popup, useMap, Circle, Pane } from 'react-leaflet'; 
import L from 'leaflet';
import 'leaflet/dist/leaflet.css';
import { ParkingSpot } from '../../types/ParkingSpot.type.ts';
import greenMarkerIcon from '../../assets/icons/green-marker-icon.png';
import redMarkerIcon from '../../assets/icons/red-marker-icon.png';
import markerIcon from 'leaflet/dist/images/marker-icon.png';
import markerShadow from 'leaflet/dist/images/marker-shadow.png';
import { useAppContext } from '../../context/AppContext.tsx';

const DefaultIcon = L.icon({
  iconUrl: markerIcon,
  shadowUrl: markerShadow,
  iconSize: [25, 41],
  iconAnchor: [12, 41],
});

L.Marker.prototype.options.icon = DefaultIcon;

interface ParkingMapProps {
  parkingSpots: ParkingSpot[] | null;
}

const ParkingMap: React.FC<ParkingMapProps> = ({ parkingSpots }) => {
  const [ preciselocation, setPreciseLocation ] = useState<{latitude: number, longitude: number} | null>(null);
  const [ approximateLocation, setApproximateLocation ] = useState<{latitude: number, longitude: number} | null>(null);
  const { country, setCountry } = useAppContext();

  useEffect(()=>{
    const setMapApproximateLocation = async() => {
      try{
        const response = await fetch(`https://restcountries.com/v3.1/name/${country}`)
        const data = await response.json();
        const location = data[0].latlng;
        console.log(location);
        setApproximateLocation({latitude:location[0], longitude:location[1]})
      }catch(e:any){
        console.log(e.message)
      }
    }
    setMapApproximateLocation();
  },[country, setCountry])


  useEffect(()=>{
    if("geolocation" in navigator) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          const { latitude, longitude } = position.coords;
          setPreciseLocation({ latitude, longitude });
        }
      )
    }
  },[])
    
  const SetMap = () => {
      const map = useMap();
      useEffect(()=>{
        if(approximateLocation !== null && preciselocation !== null){
          setTimeout(()=>{map.setView([preciselocation.latitude, preciselocation.longitude], 13)}, 0)
        }
        else if(preciselocation !== null) {
          setTimeout(()=>{map.setView([preciselocation.latitude, preciselocation.longitude], 13)}, 0)
        }else if(approximateLocation !== null){
          setTimeout(()=>{map.setView([approximateLocation.latitude, approximateLocation.longitude], 5)}, 0)
        }
      },[preciselocation])
   return null;
  }
  const [selectedSpot, setSelectedSpot] = useState<ParkingSpot | null>(null);
  return (
<MapContainer center={(approximateLocation!==null)?[approximateLocation.latitude, approximateLocation.longitude]:[0,0]} zoom={5} scrollWheelZoom={true} style={{ height: '90vh', width:"100%", transition: "1s"}}>
  <SetMap />
  <TileLayer
    attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
  />
  {(preciselocation !== null) && <Marker key={"Current_location"} position={[preciselocation.latitude,preciselocation.longitude]}>
      <Popup>
        <div>Your Location</div>
      </Popup>
    </Marker>}
  {parkingSpots && parkingSpots.map((spot) => {
        const availableIcon = new L.Icon({
          iconUrl: greenMarkerIcon, // Use a green icon for available
          iconSize: [20, 30],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });
        
        const occupiedIcon = new L.Icon({
          iconUrl: redMarkerIcon, // Use a red icon for occupied
          iconSize: [20, 30],
          iconAnchor: [12, 41],
          popupAnchor: [1, -34],
        });
        
        return (
        <Marker
          key={spot._id}
          position={[spot.location.coordinates[1], spot.location.coordinates[0]]}
          eventHandlers={{
            click: () => setSelectedSpot(spot),
          }}
          icon={spot.status === 'available' ? availableIcon : occupiedIcon}
        >
            <Popup>
              <div>
                <h4>Spot #{spot.spotNumber}</h4>
                <p>Status: {spot.status}</p>
              </div>
            </Popup>
            
        </Marker>)
})}
</MapContainer>
  );
};

export default ParkingMap;
