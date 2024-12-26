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



export const findParkingSpotById = async (req, res) => {
    try {
        const { id } = req.params; // Assuming the ID is passed as a URL parameter
        const parkingSpot = await ParkingSpot.findById(id);

        if (!parkingSpot) {
            return res.status(404).json({ message: 'Parking spot not found' });
        }

        res.status(200).json(parkingSpot);
    } catch (error) {
        console.error(error);
        res.status(500).json({ message: 'An error occurred while retrieving the parking spot' });
    }
};

