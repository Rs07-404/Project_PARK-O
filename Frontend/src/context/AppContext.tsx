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

  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);
  const [parkingSpots, setParkingSpots] = useState<ParkingSpot[] | [] | null>([]);

  useEffect(() => {
    const updateWidth = () => {
      setScreenWidth(window.innerWidth);
      console.log(screenWidth);
    };
    updateWidth();

    window.addEventListener("resize", updateWidth);

    return () => {
      window.removeEventListener("resize", updateWidth);
    };
  }, []);

  return (
    <AppContext.Provider
      value={{
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
