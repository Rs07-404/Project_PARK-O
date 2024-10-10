import bcrypt from "bcryptjs";
import User from "../models/user.model.js";
import signUser from "../utils/tokenWorks.js";

export const signup = async (req, res) =>{
    try{
        const {fullName, email, phone, gender, password, confirmPassword} = req.body;
        
        // Check for password and confirmPassword
        if(password != confirmPassword){
            return res.status(400).json({error: "Password don't match"})
        }

        // Check for existing User
        const user = await User.findOne({email});
        if(user){
            return res.status(400).json({error: "username already exists"})
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
            // profilePic: gender === "male" ? boyProfilePic : girlProfilePic
        })

        // If user created save user to db
        if(newUser){
            signUser(newUser._id, res);

            await newUser.save();
            res.status(201).json({
                _id: newUser._id,
                fullName: newUser.fullName,
                email: newUser.email,
                // profilePic: newUser.profilePic,
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
            return res.status(400).json({error: "Invalid username or password"});
        }

        // login the user
        signUser(user._id, res);

        res.status(200).json({
            _id: user._id,
            fullName: user.fullName,
            email: user.email,
            // profilePic: user.profilePic,
        })

    }catch(error){
        console.log("Error in login controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}

export const logout = (req, res) =>{
    try{
        res.cookie("jwt","",{maxAge:0})
        res.status(200).json({message: "Logged out successfully"})
    }catch(error){
        console.log("Error in logout controller", error.message);
        res.status(500).json({error: "Internal Server Error"});
    }
}