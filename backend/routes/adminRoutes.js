import express from "express";
import { loginAdmin, registerAdmin, getAllBookings } from "../controller/adminController.js";

const router = express.Router();

router.post("/register", registerAdmin);
router.post("/login", loginAdmin);
router.get("/bookings", getAllBookings);  // New route for bookings

export default router;
