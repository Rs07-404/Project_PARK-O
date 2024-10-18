import express from "express";
import authoriseUser from "../middlewares/authoriseUser";
import { addVehicle, removeVehicle } from "../controllers/vehicle.controller";

const router = express.Router();

router.post('/add', authoriseUser, addVehicle);
router.delete('/remove', authoriseUser, removeVehicle);

export default router;