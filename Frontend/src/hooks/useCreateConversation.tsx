import { useState } from "react"
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

export const useCreateConversation = () => {
    const [loading, setLoading] = useState(false);
    const {setSelectedConversation} = useConversation();
    const { conversations, setConversations } = useConversation();

    const createConversation = async({username, setShowAddConversationBox}) => {
        try {
            setLoading(true);
            const response = await fetch(`/api/conversation/create/${username}`,{
                method: "POST",
                headers: {
                    "content-type": "application/json"
                }
            });
            const user = await response.json();
            if(user.error){
                throw new Error(user.error)
            }
            setShowAddConversationBox(false);
            const existingConversations = conversations;
            setConversations([...existingConversations, user]);
            setSelectedConversation(user);
        } catch (error:any) {
            toast.error(error.message);
        } finally{
            setLoading(false)
        }
    }

    return { loading, createConversation }
}