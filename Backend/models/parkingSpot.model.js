import mongoose from "mongoose";

const parkingSpotSchema = new mongoose.Schema({
    spotNumber: {
        type: String,
        required: true,
    },
    location: {
        type: {
            type: String,
            enum: ['Point'],
            required: true,
        },
        coordinates:{
            type: [number],
            required: true,
        },
    },
    status: {
        type: String,
        enum: ['available', 'occupied'],
        default: 'available',
    },
    sensorId: {
        type: String,
    },
}, {timestamps: true});

const ParkingSpot = mongoose.model('ParkingSpot', parkingSpotSchema);

export default ParkingSpot;