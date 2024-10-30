import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";

import authRoutes from "./routes/auth.route.js"
import reservationRoutes from "./routes/reservations.route.js"
import vehicleRoutes from "./routes/vehicle.route.js"
import connectToMongoDB from "./db/connectdb.js";

dotenv.config();
const app = express();
const PORT = process.env.PORT || 5000;

app.use(express.json());
app.use(cookieParser());

app.use("/api/auth", authRoutes);
app.use("/api/reservation", reservationRoutes);
app.use("/api/vehicle", vehicleRoutes);
import crypto from 'crypto';
app.listen(PORT, async() => {
    const secretKey = crypto.createHash('sha256').update(process.env.AES_SECRET).digest('base64').slice(0, 32);
    console.log(secretKey);
    await connectToMongoDB();
    console.log(`Server running on port ${PORT}`);
})