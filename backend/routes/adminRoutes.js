import express from "express";
import { registerAdmin, loginAdmin, getAllBookings } from "../controller/adminController.js";

const router = express.Router();

// Admin auth
router.post("/register", registerAdmin);
router.post("/login", loginAdmin);

// Bookings for admin
router.get("/bookings", getAllBookings);

export default router;
