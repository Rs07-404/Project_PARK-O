import { createContext, useContext, useState } from "react";
import { User } from "../types/User.type.ts";
import { AuthContextType } from "../types/AuthContext.type.ts";


export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }) => {
    const storedUser = localStorage.getItem("chat-user");
    const [authUser, setAuthUser] = useState<User |  null>(storedUser ? JSON.parse(storedUser) : null);



    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
}
