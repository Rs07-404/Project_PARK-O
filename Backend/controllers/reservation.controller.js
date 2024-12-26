import ParkingSpot from "../models/parkingSpot.model.js";
import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";

export const createReservation = async (req, res) => {
    try {
        const { parkingAreaId, parkingSpotId, startTime, endTime } = req.body;

        // // Check if the user has the vehicle
        // const vehicle = await Vehicle.findOne({ _id: vehicleId, userId: req.user._id });
        // if (!vehicle) {
        //     return res.status(404).json({ error: "Vehicle not found or doesn't belong to the user." });
        // }

        // Check if the parking spot exists and is available
        const parkingSpot = await ParkingSpot.findById(parkingSpotId);
        if (!parkingSpot) {
            return res.status(404).json({ error: "Parking spot not found." });
        }
        if (parkingSpot.status === "occupied") {
            return res.status(400).json({ error: "Parking spot is currently occupied." });
        }

        // Check if there are conflicting reservations
        const currentTime = new Date();
        const overlappingReservation = await Reservation.findOne({
            parkingAreaId,
            parkingSpotId,
            startTime: { $lte: endTime },
            endTime: { $gte: startTime },
        });

        if (overlappingReservation) {
            return res.status(400).json({ error: "Conflicting reservation exists for the selected time range." });
        }

        // Create a new reservation
        const reservation = new Reservation({
            userId: req.user._id,
            parkingAreaId,
            parkingSpotId,
            // vehicleId,
            startTime,
            endTime,
            status: "confirmed",
        });

        // Associate the reservation with the user
        const user = await User.findById(req.user._id);
        if (user) {
            user.reservations.push(reservation._id);
            await user.save();
        }

        // Save the reservation
        await reservation.save();

        // Mark the parking spot as occupied
        parkingSpot.status = "occupied";
        await parkingSpot.save();

        res.status(201).json({
            message: "Reservation created successfully.",
            reservation,
        });
    } catch (error) {
        console.error("Error in createReservation controller:", error.message);
        res.status(500).json({ error: "Internal server error." });
    }
};


// Verify Parking Reservation
export const checkReservation = async (req, res) => {
    try {
        // Get the current server time in ISO format
        const currentTime = new Date();

        // Extract userId and parkingAreaId from the request
        const { userId, parkingAreaId } = req.body;

        // Validate required fields
        if (!userId || !parkingAreaId) {
            return res.status(400).json({ message: "userId and parkingAreaId are required." });
        }

        // Query the database to check for overlapping reservations
        const existingReservation = await Reservation.findOne({
            userId,
            parkingAreaId,
            startTime: { $lte: currentTime },
            endTime: { $gte: currentTime },
        });

        if (existingReservation) {
            return res.status(200).json({
                message: "A reservation exists during the current time for the given parking area.",
                reservation: existingReservation,
            });
        }

        return res.status(200).json({ message: "No reservations found during the current time for the given parking area." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error occurred.", error: error.message });
    }
};
