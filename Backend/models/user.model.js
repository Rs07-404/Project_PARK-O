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
    roles: {
        type: [String],
        enum: ["User","LandOwner","Admin"],
        default: ["User"],
        required: true,
        validate: {
          validator: function (roles) {
            return Array.isArray(roles) && new Set(roles).size === roles.length;
          },
          message: "Roles must be unique.",
        },
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
        ref: 'Vehicle',
        default: [],
    }],
    reservations: [{
        type: mongoose.Schema.Types.ObjectId,
        res: 'Reservation',
        default: [],
    }],
    qrcode: {
        type: String,
        default: '',
    }
}, { timestamps: true});

const User = mongoose.model("User", userSchema);

export default User;