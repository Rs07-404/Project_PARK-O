import { useState } from "react";
import { useAppContext } from "../context/AppContext";
import toast from "react-hot-toast";


export const useLocationHook = () => {
    const { setPreciseLocation  } = useAppContext();
    const [ loading, setLoading ] = useState(false);

    const getPreciseLocation = () => {
        setLoading(true);
        if ("geolocation" in navigator) {
          navigator.geolocation.getCurrentPosition(
            (position: GeolocationPosition) => {
              const { latitude, longitude } = position.coords;
              setPreciseLocation({ latitude, longitude });
            },
            (error: GeolocationPositionError) => {
              switch (error.code) {
                case error.PERMISSION_DENIED:
                  toast.error("The permission to access location is denied");
                  break;
                case error.POSITION_UNAVAILABLE:
                  toast.error("Location information is unavailable.");
                  break;
                case error.TIMEOUT:
                  toast.error("The request to get user location timed out.");
                  break;
                default:
                  toast.error("An error occurred.");
                  break;
              }
            }
          );
        } else {
          toast.error("Geolocation is not supported by this browser.");
        }

        setLoading(false);
      };
    return { loading, getPreciseLocation }
}