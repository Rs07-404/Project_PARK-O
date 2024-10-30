import User from "../models/user.model.js";
import Vehicle from "../models/vehicle.model.js";

export const addVehicle = async (req, res) => {
    try {
        const { name, model, numberPlate } = req.body;

        const user = User.findById(req.user._id);

        if(user){
            // Create a new vehicle
            const newVehicle = new Vehicle({
                userId: req.user._id,
                name,
                model,
                numberPlate,
            });

            if(newVehicle){
                user.vehicles.push(newVehicle._id);
                await Promise.all([user.save(), newVehicle.save()]);
            }else{
                res.status(400).json({ error: "Failed to add vehicle. Please try again" });
            }
        }


        await newVehicle.save();

        res.status(201).json({ message: "Vehicle added successfully", vehicle: newVehicle });
    } catch (error) {
        console.log("Error in addVehicle controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
}

export const removeVehicle = async (req, res) => {
    try {
        const { vehicleId } = req.params;

        // Find the vehicle and check if it belongs to the logged-in user
        const vehicle = await Vehicle.findOneAndDelete({ 
            _id: vehicleId,
            userId: req.user._id 
        });

        // Check if vehicle was found and deleted
        if (!vehicle) {
            return res.status(404).json({ error: "Vehicle not found or does not belong to the user" });
        }

        res.status(200).json({ message: "Vehicle removed successfully", vehicle });
    } catch (error) {
        console.log("Error in removeVehicle controller: ", error.message);
        res.status(500).json({ error: "Internal server error" });
    }
};