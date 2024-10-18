import express from "express";
import { createReservation, verifyParkedVehicle } from "../controllers/reservation.controller";
import authoriseUser from "../middlewares/authoriseUser";

const router = express.Router();

router.post('/create', authoriseUser, createReservation);
router.post('/verifyVehicle', verifyParkedVehicle);

export default router;