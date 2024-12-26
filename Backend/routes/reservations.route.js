import express from "express";
import { createReservation, checkReservation } from "../controllers/reservation.controller.js";
import authoriseUser from "../middlewares/authoriseUser.js";

const router = express.Router();

router.post('/create', authoriseUser, createReservation);
router.post('/verifyVehicle', checkReservation);

export default router;