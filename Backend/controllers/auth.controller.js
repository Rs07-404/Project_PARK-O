import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import {signUser} from "../utils/tokenWorks.js";
import { generateQRCode } from "../utils/qrcodeworks.js";
import jwt from "jsonwebtoken";

export const signup = async (req, res) =>{
    try{
        const {fullName, email, phone, gender, password, confirmPassword} = req.body;
        
        // Check for password and confirmPassword
        if(password != confirmPassword){
            return res.status(400).json({error: "Password don't match"})
        }

        // Check for existing User
        const user = await User.findOne({email});
        console.log(user)
        if(user){
            return res.status(400).json({error: "user already exists"})
        }

        // Password Hashed here
        const salt = await bcrypt.genSalt(10);
        const hashedPassword = await bcrypt.hash(password, salt);

        // Get Profile Pictures
        // const boyProfilePic = `https://avatar.iran.liara.run/public/boy?username=${username}`;
        // const girlProfilePic = `https://avatar.iran.liara.run/public/girl?username=${username}`;
        
        // Create New User
        const newUser = new User({
            fullName,
            email,
            password:hashedPassword,
            phone,
            gender,
            role: ["User"],
        });

        // If user created save user to db
        if(newUser){
            signUser(newUser._id, res);
            
            const qrData = {
                userId: newUser._id,
            }
            const qrcode = await generateQRCode(qrData);
            newUser.qrcode = qrcode;
            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                roles: newUser.roles,
                qrcode: newUser.qrcode
            });
        }else{
            res.status(400).json({error: "Invalid user data"});
        }

    }catch(error){
        console.log("Error in signup controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const login = async (req, res) =>{
    try{
        const {email, password} = req.body;

        // check if user is present and then check for password
        const user = await User.findOne({email});
        const isPasswordCorrect = await bcrypt.compare(password, user?.password || "");
        if(!user || !isPasswordCorrect){
            return res.status(400).json({error: "Invalid email or password"});
        }

        // login the user
        signUser(user._id, user.roles, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            roles: user.roles,
            qrcode: user.qrcode
        })

    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const logout = (req, res) =>{
    try{
        res.cookie("user","",{maxAge:0})
        res.status(200).json({message: "Logged out successfully"})
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const verifyUser = async (req, res) => {
    try{
        const cred = req.cookies.user;
        if(!cred) return res.status(401).json({error: "User Unauthenticated"});
        const { id, roles } = jwt.verify(cred, process.env.JWT_SECRET);
        if(!id || !roles) return res.status(401).json({error: "Invalid Credentials"});
        const user = await User.findById(id);
        if(!user) return res.status(404).json({error: "User not found"});
        if (user.roles.includes(...roles)) {return res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            roles: user.roles,
            qrcode: user.qrcode
        })} else{
            res.status(401).json({error: "User not found"});
        }
    } catch (error) {
        console.log("Error in verify user auth controller: ", error);
        res.status(500).json({error: "Error Verifying User."});
    }
}