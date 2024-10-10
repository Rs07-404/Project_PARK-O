import mongoose from "mongoose";

const vehicleSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    name: {
        type: String,
        required: true,
    },
    model: {
        type: String,
        required: true,
    },
    numberPlate:{
        type: String,
        required: true,
        unique: true,
    },
}, {timestamps: true});


const Vehicle = mongoose.model("Vehicle", vehicleSchema);
export default Vehicle;