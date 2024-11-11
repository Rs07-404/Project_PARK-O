import { useEffect } from "react";
import Header from "../../components/Header/Header.tsx";
import ParkingMap from "../../components/Map/Map.tsx";
import { useAppContext } from "../../context/AppContext.tsx";
// import { useAuthContext } from "../../context/AuthContext.tsx";
// import { ParkingSpot } from "../../types/ParkingSpot.type.ts";
import useParkingSpot from "../../hooks/ParkingSpotHook.tsx";

const Home = () => {
  const { parkingSpots } = useAppContext();
  // const { authUser } = useAuthContext();
  const { fetchParkingSpots } = useParkingSpot();

  useEffect(() => {
    fetchParkingSpots();
  },[])


  return (
    <div className="canvasHome">
      <Header />
      <ParkingMap parkingSpots={parkingSpots} />
      {/* { authUser?.qrcode && <svg dangerouslySetInnerHTML={{__html: authUser.qrcode}} />} */}
    </div>
  );
};

export default Home;
