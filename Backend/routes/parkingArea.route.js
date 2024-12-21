import express from "express";
import * as parkingAreaController from "../controllers/parkingArea.controller.js";

const router = express.Router();

// ============================ CREATE ============================ //
// Create a Parking Area
router.post("/", parkingAreaController.createParkingArea);

// ============================ READ ============================ //
// Get all Parking Areas
router.get("/", parkingAreaController.getAllParkingAreas);

// Get a Parking Area by ID
router.get("/:id", parkingAreaController.getParkingAreaById);

// Find Parking Areas within a radius
router.post("/find-within-radius", parkingAreaController.findParkingAreasWithinRadius);

// ============================ UPDATE ============================ //
// Update a Parking Area by ID
router.put("/:id", parkingAreaController.updateParkingArea);

// Add a Parking Spot to a Parking Area
router.post("/add-spot", parkingAreaController.addParkingSpotToArea);

// ============================ DELETE ============================ //
// Remove a Parking Spot from a Parking Area
router.post("/remove-spot", parkingAreaController.removeParkingSpotFromArea);

// Delete a Parking Area by ID
router.delete("/:id", parkingAreaController.deleteParkingArea);

export default router;
