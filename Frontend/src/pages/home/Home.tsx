import { useEffect } from "react";
import Header from "../../components/Header/Header.tsx";
import ParkingMap from "../../components/Map/Map.tsx";
import { useAppContext } from "../../context/AppContext.tsx";
// import { useAuthContext } from "../../context/AuthContext.tsx";
// import { ParkingSpot } from "../../types/ParkingSpot.type.ts";
import useParkingSpot from "../../hooks/ParkingSpotHook.tsx";
import ReservationBox from "../../components/ReservationForm/ReservationForm.tsx";

const Home = () => {
  const { parkingSpots, selectedSpot } = useAppContext();
  // const { authUser } = useAuthContext();
  const { fetchParkingSpots } = useParkingSpot();
  useEffect(() => {
    fetchParkingSpots();
  },[])


  return (
    <div className="canvasHome">
      <Header />
      <div className="AppContentbody">
        {selectedSpot != null && <ReservationBox />}
        <ParkingMap parkingSpots={parkingSpots} />
      </div>
      {/* { authUser?.qrcode && <svg dangerouslySetInnerHTML={{__html: authUser.qrcode}} />} */}
    </div>
  );
};

export default Home;
