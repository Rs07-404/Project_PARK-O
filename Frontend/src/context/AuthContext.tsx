import { createContext, useContext, useEffect, useState } from "react";
import { User } from "../types/User.type.ts";
import { AuthContextType } from "../types/AuthContext.type.ts";
import toast from "react-hot-toast";


export const useAuthContext = () => {
    const context = useContext(AuthContext);
    if(!context){
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    } 
    return context;
}

export const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const AuthContextProvider = ({ children }) => {
    const storedUser = localStorage.getItem("user");
    const [authUser, setAuthUser] = useState<User |  null>(storedUser ? JSON.parse(storedUser) : null);

    useEffect(()=>{
        const verify = async () => {
            try{
                const response = await fetch('/api/auth/verifylogin');
                const user = await response.json();
                setAuthUser(user);
            } catch (error){
                toast.error("Login to Access")
            }
        }

        verify();
    },[])


    return <AuthContext.Provider value={{ authUser, setAuthUser }}>{children}</AuthContext.Provider>;
}
