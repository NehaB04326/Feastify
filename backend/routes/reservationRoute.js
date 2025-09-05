import express from "express";
import { sendReservation } from "../controller/reservation.js";
import { isAuthenticated } from "../middleware/auth.js";

const router = express.Router();

// Only logged-in users can send reservations
router.post("/send", isAuthenticated, sendReservation);

export default router;
