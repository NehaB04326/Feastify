// backend/controllers/adminController.js
import { Admin } from "../models/adminSchema.js";
import { Reservation } from "../models/reservationSchema.js";  // use Reservation model

// Register admin
export const registerAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    let admin = await Admin.findOne({ email });
    if (admin) {
      return res.status(400).json({ success: false, message: "Admin already exists" });
    }

    admin = new Admin({ email, password });
    await admin.save();

    res.status(201).json({ success: true, message: "Admin registered successfully" });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Login admin
export const loginAdmin = async (req, res) => {
  try {
    const { email, password } = req.body;

    const admin = await Admin.findOne({ email });
    if (!admin) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const isMatch = await admin.comparePassword(password);
    if (!isMatch) {
      return res.status(400).json({ success: false, message: "Invalid credentials" });
    }

    const token = admin.getJWT();

    res
      .status(200)
      .cookie("token", token, { httpOnly: true, secure: false, sameSite: "lax" })
      .json({ success: true, message: "Login successful", token });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};

// Get all reservations (for admin dashboard)
export const getAllBookings = async (req, res) => {
  try {
    const reservations = await Reservation.find();

    res.status(200).json({ success: true, bookings: reservations });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
