import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";
import { ParkingSpot } from "../types/ParkingSpot.type";

export const AppContext = createContext<
  | {
      country: String | null,
      setCountry: React.Dispatch<SetStateAction<string | null>>
      screenWidth: number;
      setScreenWidth: React.Dispatch<SetStateAction<number>>;
      parkingSpots: ParkingSpot[] | [] | null;
      setParkingSpots: React.Dispatch<SetStateAction<ParkingSpot[] | [] | null>>;
    }
  | undefined
>(undefined);

export const useAppContext = () => {
  const context = useContext(AppContext);
  if (!context) {
    throw new Error("useAppContext must be used within an AppContextProvider");
  }
  return context;
};

export const AppContextProvider = ({ children }: { children: ReactNode }) => {
  const [ country, setCountry ] = useState<String | null>(null);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[] | [] | null>([]);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
    };

    const getClientCountry = async () => {
      const response = await fetch("https://api.ipgeolocation.io/ipgeo?apiKey=bdd9c21977ed42b69becc92c9ed8ca63");
      const data = await response.json();
      setCountry(data.country_name);
    }

    updateWidth();
    getClientCountry();
    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
        country,
        setCountry,
        screenWidth,
        setScreenWidth,
        parkingSpots,
        setParkingSpots
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
