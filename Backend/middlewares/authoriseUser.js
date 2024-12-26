import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

const authoriseUser = async (req, res, next) => {
    try {
        const token = req.cookies.user;
        if(!token){
            return res.status(401).json({ error: "Unauthorized - No Token Provided" });
        }

        const { id, roles } = jwt.verify(token, process.env.JWT_SECRET);

        if(!id, !roles){
            return res.status(401).json({ error: "Unauthorized - Invalid Token" });
        }

        const user = await User.findById(id).select("-password")
        
        if(!user){
            return res.status(404).json({ error: "User not found" });
        }
        if(!user.roles.includes("User")){
            return res.status(401).json({ error: "Unauthorized Acess" });
        }

        req.user = user;
        next();
        
    } catch (error) {
        console.log("Error in authoriseUser middleware: ",error.message);
        res.status(500).json({ error:"Internal server error" });
    }
}

export default authoriseUser;