import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import connectToMongoDB from "./db/connectdb.js";

import authRoutes from "./routes/auth.route.js";
import reservationRoutes from "./routes/reservations.route.js";
import vehicleRoutes from "./routes/vehicle.route.js";
import parkingSportRoutes from "./routes/parkingSpot.route.js";
import parkingAreaRotues from "./routes/parkingArea.route.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/vehicle", vehicleRoutes);
app.use("/api/parkingSpot", parkingSportRoutes);
app.use("/api/parkingArea", parkingAreaRotues);

import crypto from 'crypto';
app.listen(PORT, async() => {
    await connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
})