import express from "express";
import authoriseUser from "../middlewares/authoriseUser.js";
import { findParkingSpotById, getAllParkingSpots } from "../controllers/parkingSpot.controller.js";

const router = express.Router();

router.get('/', authoriseUser,  getAllParkingSpots);
router.get('/:id', findParkingSpotById);

export default router;