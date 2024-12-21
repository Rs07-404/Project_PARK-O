import mongoose, { Mongoose } from "mongoose";

const parkingAreaSchema = new mongoose.Schema({
    name:{
        type: String,
        required: true,
    },
    location:{
        location: {
            type: {
                type: String,
                enum: ['Point'],
                required: true,
            },
            coordinates:{
                type: [Number],
                required: true,
            },
        },
    },
    boundary:{
        type: {
            type: String,
            enum: ['Polygon'],
            required: true,
        },
        coordinates: {
            type: [[[Number]]],
            required: true,
        },
    },
    area: {
        type: Number,
        required: false,
    },
    parkingSpots: [
        {
            type: mongoose.Schema.Types.ObjectId,
            ref: 'ParkingSpot',
            default: []
        }
    ]
})


const ParkingArea = mongoose.model('ParkingArea', parkingAreaSchema);
export default ParkingArea;