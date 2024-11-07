import express from "express";
import authoriseUser from "../middlewares/authoriseUser.js";
import { getAllParkingSpots } from "../controllers/parkingSpot.controller.js";

const router = express.Router();

router.get('/', authoriseUser,  getAllParkingSpots);

export default router;