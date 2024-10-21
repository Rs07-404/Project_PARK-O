import { useState } from "react"
import toast from "react-hot-toast";
import { useAuthContext } from "../context/AuthContext";


const useLogin = () => {
    const [loading, setLoading] = useState(false);
    const { setAuthUser } = useAuthContext();

    const login = async({username, password}) => {
        const success = handleInputErrors({username, password});
        if (!success) return;

        setLoading(true);
        try {
            const response = await fetch("api/auth/login",{
                method: "POST",
                headers: { "Content-Type": "application/json" },
                body: JSON.stringify({
                    username, password
                })
            })
            const data = await response.json();
            if(data.error){
                throw new Error(data.error);
            }

            localStorage.setItem('chat-user', JSON.stringify(data));
            setAuthUser(data);

        } catch (error:any) {
            toast.error(error.message);
        }finally{
            setLoading(false);
        }
    }
    return { loading, login }
}

const handleInputErrors = ({username, password}) => {
    if(!username || !password){
        toast.error('Please fill in all fields');
        return false;
    }

    if(password.length < 6){
        toast.error('Passwords must be at least 6 characters');
        return false;
    }

    return true;
}

export default useLogin;