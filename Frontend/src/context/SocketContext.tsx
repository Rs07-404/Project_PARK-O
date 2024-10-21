import { createContext, useContext, useEffect, useState } from "react";
import { useAuthContext } from "./AuthContext";
import io, { Socket } from "socket.io-client";
import newConversationSound from "../assets/sounds/newConversation.mp3";
import useConversation from "../zustand/useConversation";

export const useSocketContext = () => {
    const context = useContext(SocketContext);
    if(!context){
        throw new Error("useAuthContext must be used within an AuthContextProvider");
    }
    return context;
}

export const SocketContext = createContext<{socket: Socket | null, onlineusers: any}>({socket: null, onlineusers: []});

export const SocketContextProvider = ({children}) => {
    const [socket, setSoket] = useState<Socket | null>(null);
    const [onlineusers, setOnlineUsers] = useState([]);
    const { authUser } = useAuthContext();
    const { setConversations } = useConversation();
    const notification = new Audio(newConversationSound);

    useEffect(()=>{
        if(authUser){
            const socket = io("https://chatnet-fusd.onrender.com",{
                query: {
                    userId: authUser._id,
                }
            });
            setSoket(socket);

            socket.on("getOnlineUsers", (users)=>{
                setOnlineUsers(users);
            })

            socket.on("newConversation",(newConversation)=>{
                notification.play();
                const existingConversations = useConversation.getState().conversations;
                setConversations([...existingConversations, newConversation]);
            });

            return ()=>{
                socket.close();
            }
        }else{
            if(socket){
                socket.close();
                setSoket(null);
            }
        }
    },[authUser])
    return(
        <SocketContext.Provider value={{socket, onlineusers}}>
            {children}
        </SocketContext.Provider>
    )
}