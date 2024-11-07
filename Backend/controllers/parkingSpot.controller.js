import ParkingSpot from '../models/parkingSpot.model.js';

export const getAllParkingSpots = async (req,res) => {
    try {
        const parkingSpots = await ParkingSpot.find();
        res.status(200).json(parkingSpots);
    } catch (error) {
        console.error('Error fetching parking spots:', error);
        res.status(500).json({ message: 'Failed to fetch parking spots' });
    }
};
