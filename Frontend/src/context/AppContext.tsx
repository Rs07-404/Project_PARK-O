import React, {
  createContext,
  ReactNode,
  SetStateAction,
  useContext,
  useEffect,
  useState,
} from "react";

export const AppContext = createContext<
  | {
      screenWidth: number;
      setScreenWidth: React.Dispatch<SetStateAction<number>>;
      showAddConversationBox: boolean | null;
      setShowAddConversationBox: React.Dispatch<SetStateAction<boolean>>;
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
  const [showAddConversationBox, setShowAddConversationBox] =
    useState<boolean>(false);
  const [screenWidth, setScreenWidth] = useState<number>(window.innerWidth);

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
        showAddConversationBox,
        setShowAddConversationBox,
      }}
    >
      {children}
    </AppContext.Provider>
  );
};
