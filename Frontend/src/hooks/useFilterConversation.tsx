import { useState } from "react"
import useConversation from "../zustand/useConversation";

export const useFilterConversation = () => {
    const [loading, setLoading] = useState(false);
    const { setFilteredConversations } = useConversation();

    const filterConversation = (search) => {
        try{
            setLoading(true);
            const conversations = useConversation.getState().conversations;
            const filteredConversation = conversations.filter((conversation)=>{
                if (conversation.fullName.toLowerCase().includes(search)) return conversation;
            })
            setFilteredConversations(filteredConversation);
        } catch(error:any){
            console.log(error.message);
        } finally {
            setLoading(false);
        }
    }

    return { loading, filterConversation }
}