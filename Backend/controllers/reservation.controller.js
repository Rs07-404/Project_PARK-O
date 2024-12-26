import ParkingSpot from "../models/parkingSpot.model.js";
import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";
// import Vehicle from "../models/vehicle.model.js";
import { decryptEncryptedPayload } from "../utils/qrcodeworks.js";
import scanQRCodeFromImage from "../utils/scanImage.js";

export const createReservation = async (req, res) => {
    try {
        const { parkingSpotId, startTime, endTime } = req.body;

        // const allParkingSpots = await ParkingSpot.find({});
        // console.log(allParkingSpots);
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
            parkingSpotId,
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

        // Set a timer to update the parking spot status to 'available' after the reservation end time
        const timeUntilAvailable = new Date(endTime).getTime() - Date.now();
        
        // Use setTimeout to change the parking spot status after the reservation ends
        setTimeout(async () => {
            const spot = await ParkingSpot.findById(parkingSpotId);
            if (spot && spot.status === "occupied") {
                spot.status = "available";
                await spot.save();
            }
        }, timeUntilAvailable);

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

        // Extract parkingAreaId and image from the request
        const { image } = req.body;

        if (!image) {
            return res.status(400).json({ message: "Image is required." });
        }

        // Scan QR code from the image to get the encrypted payload
        const encryptedPayload = await scanQRCodeFromImage(image);
        if (!encryptedPayload) {
            return res.status(400).json({ message: "Failed to extract QR code from the image." });
        }

        if (!encryptedPayload || typeof encryptedPayload !== 'string') {
            return res.status(400).json({ message: "Failed to extract details from QR code" });
        }
        const data = await decryptEncryptedPayload(encryptedPayload);

        // Validate required fields
        if (!data.userId) {
            return res.status(400).json({ message: "userId and parkingAreaId are required." });
        }

        // Query the database to check for overlapping reservations
        const existingReservation = await Reservation.findOne({
            userId: data.userId,
            startTime: { $lte: currentTime },
            endTime: { $gte: currentTime },
            verified: { $eq: false },
        });

        if (existingReservation) {
            existingReservation.verified = true;
            await existingReservation.save();
            return res.status(200).json({
                success: "A reservation exists during the current time for the given parking area."
            });
        }

        return res.status(200).json({ message: "No reservations found during the current time for the given parking area." });
    } catch (error) {
        console.error(error);
        return res.status(500).json({ message: "Server error occurred.", error: error.message });
    }
};
