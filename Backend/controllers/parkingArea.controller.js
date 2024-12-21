import mongoose from "mongoose";
import ParkingArea from "../models/parkingArea.model";


// ============================ CREATE ============================ //
// Create a ParkingArea
exports.createParkingArea = async (req, res) => {
    try {
        const { name, location, boundary, area, parkingSpots } = req.body;

        const parkingArea = new ParkingArea({
            name,
            location,
            boundary,
            area,
            parkingSpots: parkingSpots || [],
        });

        const result = await parkingArea.save();
        res.status(201).json(result);
    } catch (error) {
        console.error(`Error creating Parking Area: ${error.message}`);
        res.status(500).json({ message: `Error creating Parking Area: ${error.message}` });
    }
};

// ============================ READ ============================ //
// Get All Parking Areas
exports.getAllParkingAreas = async (req, res) => {
    try {
        const parkingAreas = await ParkingArea.find().populate({
            path: 'parkingSpots',
            model: 'ParkingSpot',
        });
        res.status(200).json(parkingAreas);
    } catch (error) {
        console.error(`Error retrieving all Parking Areas: ${error.message}`);
        res.status(500).json({ message: `Error retrieving all Parking Areas: ${error.message}` });
    }
};

// Read a ParkingArea by ID
exports.getParkingAreaById = async (req, res) => {
    try {
        const { id } = req.params;
        const parkingArea = await ParkingArea.findById(id).populate({
            path: 'parkingSpots',
            model: 'ParkingSpot',
        });
        if (!parkingArea) return res.status(404).json({ error: `Parking Area not found` });
        res.status(200).json(parkingArea);
    } catch (error) {
        console.error(`Error retrieving Parking Area: ${error.message}`);
        res.status(500).json({ message: `Error retrieving Parking Area: ${error.message}` });
    }
};

// Find ParkingAreas within a radius
exports.findParkingAreasWithinRadius = async (req, res) => {
    try {
        const { coordinates, radius } = req.body;
        const parkingAreas = await ParkingArea.find({
            'location.coordinates': {
                $geoWithin: {
                    $centerSphere: [coordinates, radius / 6378.1], // Radius in kilometers
                },
            },
        }).populate({
            path: 'parkingSpots',
            model: 'ParkingSpot',
        });
        res.status(200).json(parkingAreas);
    } catch (error) {
        console.error(`Error finding Parking Areas: ${error.message}`);
        res.status(500).json({ message: `Error finding Parking Areas: ${error.message}` });
    }
};


// ============================ UPDATE ============================ //
// Update a ParkingArea by ID
exports.updateParkingArea = async (req, res) => {
    try {
        const { id } = req.params;
        const data = req.body;
        const updatedParkingArea = await ParkingArea.findByIdAndUpdate(id, data, { new: true });
        if (!updatedParkingArea) return res.status(404).json({ error: `Parking Area not found` });
        res.status(200).json({ message: "Parking Area Updated Successfully", updatedParkingArea });
    } catch (error) {
        console.error(`Error updating Parking Area: ${error.message}`);
        res.status(500).json({ message: `Error updating Parking Area: ${error.message}` });
    }
};

// Add a ParkingSpot to a ParkingArea
exports.addParkingSpotToArea = async (req, res) => {
    try {
        const { parkingAreaId, parkingSpotId } = req.body;
        const parkingArea = await ParkingArea.findById(parkingAreaId);
        if (!parkingArea) return res.status(404).json({ error: "Parking Area not found" });

        parkingArea.parkingSpots.push(parkingSpotId);
        const updatedParkingArea = await parkingArea.save();
        res.status(201).json({ message: "Parking Spot Added Successfully", updatedParkingArea });
    } catch (error) {
        console.error(`Error adding Parking Spot: ${error.message}`);
        res.status(500).json({ message: `Error adding Parking Spot: ${error.message}` });
    }
};


// ============================ DELETE ============================ //
// Remove a ParkingSpot from a ParkingArea
exports.removeParkingSpotFromArea = async (req, res) => {
    try {
        const { parkingAreaId, parkingSpotId } = req.body;
        const parkingArea = await ParkingArea.findById(parkingAreaId);
        if (!parkingArea) return res.status(404).json({ error: "Parking Area not found" });

        parkingArea.parkingSpots = parkingArea.parkingSpots.filter(spot => spot.toString() !== parkingSpotId);
        const updatedParkingArea = await parkingArea.save();
        res.status(200).json({ message: "Parking Spot Removed Successfully", updatedParkingArea });
    } catch (error) {
        console.error(`Error removing Parking Spot: ${error.message}`);
        res.status(500).json({ message: `Error removing Parking Spot: ${error.message}` });
    }
};

// Delete a ParkingArea by ID
exports.deleteParkingArea = async (req, res) => {
    try {
        const { id } = req.params;
        const deletedParkingArea = await ParkingArea.findByIdAndDelete(id);
        if (!deletedParkingArea) return res.status(404).json({ error: "Parking Area not found" });
        res.status(200).json({ message: "Parking Area Deleted Successfully", deletedParkingArea });
    } catch (error) {
        console.error(`Error deleting Parking Area: ${error.message}`);
        res.status(500).json({ message: `Error deleting Parking Area: ${error.message}` });
    }
};