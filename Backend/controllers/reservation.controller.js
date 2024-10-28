import ParkingSpot from "../models/parkingSpot.model.js";
import Reservation from "../models/reservation.model.js";
import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";

export const createReservation = async (req, res) => {
    try {
        const { parkingSpotId, vehicleId, startTime, endTime } = req.body;

        // Checking if the user has the vehicle
        const vehicle = await Vehicle.findOne({ _id: vehicleId, userId: req.user._id });
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found or doesn't belong to the user" });
        }

        // Checking if the parking spot exists and is available
        const parkingSpot = await ParkingSpot.findById(parkingSpotId);
        if (!parkingSpot) {
            return res.status(404).json({ error: "Parking spot not found" });
        }
        if (parkingSpot.status === "occupied") {
            return res.status(400).json({ error: "Parking spot is currently occupied" });
        }

        // Find the user
        const user = await User.findById(req.user._id);

        // Creating the reservation
        if (user){
            const reservation = new Reservation({
                userId: req.user._id,
                parkingSpotId: parkingSpot._id,
                vehicleId: vehicle._id,
                startTime,
                endTime,
                status: "confirmed"
            });

            if(reservation){
                user.reservations.push(reservation._id);
            }

            await Promise.all([reservation.save(), user.save()]);
        }

        await reservation.save();

        // Make the parking spot as occupied
        parkingSpot.status = "occupied";
        await parkingSpot.save();

        res.status(201).json({
            message: "Reservation created successfully",
            reservation
        });

    } catch (error) {
        console.log("Error in createReservation controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};


export const verifyParkedVehicle = async (req, res) => {
    try {
        const { parkingSpotId, rfid } = req.body;

        // Find the reservation for the given parking spot
        const reservation = await Reservation.findOne({
            parkingSpotId,
            status: 'confirmed'
        });

        // Check if reservation exists
        if (!reservation) {
            return res.status(404).json({ error: "Reservation not found or not confirmed" });
        }

        // Find the vehicle associated with the reservation
        const vehicle = await Vehicle.findById(reservation.vehicleId);

        // Check if the RFID matches the vehicle's RFID
        if (vehicle.rfid !== rfid) {
            return res.status(403).json({ error: "RFID does not match the vehicle" });
        }

        // Update reservation status to 'parked'
        reservation.status = 'parked';
        await reservation.save();

        res.status(200).json({ message: "Vehicle parked successfully", reservation });

    } catch (error) {
        console.log("Error in parkVehicle controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};
