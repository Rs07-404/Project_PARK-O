import { useState } from "react"
import { useAuthContext } from "../context/AuthContext"


export const useLogout = () => {
    const [loading, setLoading] = useState(false)
    const { setAuthUser } = useAuthContext();

    const logout = async () => {
        setLoading(true)
        try {
            const response = await fetch('/api/auth/logout', {
                method: "POST",
                headers: {"content-type": "application/json"}
            })

            const data = await response.json();
            if(data.error){
                throw new Error(data.error);
            }

            localStorage.removeItem('chat-user');
            setAuthUser(null);
        } catch (error) {
            // throw new Error(data.error)
        } finally {
            setLoading(false)
        }
    }

    return { loading, logout }
}
