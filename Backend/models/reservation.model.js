import mongoose from "mongoose";

const reservationSchema = new mongoose.Schema({
    userId:{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true,
    },
    parkingAreaId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'User',
        required: true
    },
    parkingSpotId: {
        type: mongoose.Schema.Types.ObjectId,
        ref: 'ParkingSpot',
        required: true,
    },
    // vehicleId: {
    //     type: mongoose.Schema.Types.ObjectId,
    //     ref:'Vehicle',
    //     required: true,
    // },
    startTime: {
        type: Date,
        required: true,
    },
    endTime: {
        type: Date,
        required: true,
    },
    status:{
        type: String,
        enum: ['confirmed','parked','completed','canceled'],
        default: 'confirmed',
    },
}, {timestamps: true});


const Reservation = mongoose.model('Reservation', reservationSchema);
export default Reservation;