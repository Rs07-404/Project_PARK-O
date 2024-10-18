import mongoose from "mongoose";

const userSchema = new mongoose.Schema({
    fullName:{
        type:String,
        required:true
    },
    email:{
        type:String,
        required:true,
        unique:true
    },
    password:{
        type:String,
        required:true,
        minlength:6
    },
    phone:{
        type: String,
        required: true
    },
    gender:{
        type:String,
        required:true,
        enum:["male","female"]
    },
    vehicles:[{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Vwhicle',
        default: [],
    }],
    reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        res: 'Reservation',
        default: [],
    }],
}, { timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;