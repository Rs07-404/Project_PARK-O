import { useEffect, useState } from "react";
import toast from "react-hot-toast";
import useConversation from "../zustand/useConversation";

const useGetConversations = () => {
    const [loading, setLoading] = useState(false);
    // const [contacts, setContacts] = useState<User[] | []>([]);
    const { setConversations } = useConversation();

    useEffect(()=>{
        const getConversations = async () => {
            setLoading(true);
            try {
                const response = await fetch('/api/users/contacts');
                const data = await response.json();
                if(data.error){
                    throw new Error(data.error);
                }
                setConversations(data);

            } catch (error:any) {
                toast.error(error.message);
            } finally {
                setLoading(false);
            }
        }
        getConversations()

    }, []);

    return { loading };
}

export default useGetConversations;