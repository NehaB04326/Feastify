// backend/controllers/adminController.js

import { Admin } from "../models/adminSchema.js";
import Booking from "../models/bookingModel.js";  // import Booking model

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

// Get all bookings (for admin dashboard)
export const getAllBookings = async (req, res) => {
  try {
    const bookings = await Booking.find()
      .populate("user", "email")    // populate user email only
      .populate("room", "name");    // populate room name only

    // Format bookings to send only relevant info
    const formattedBookings = bookings.map((b) => ({
      _id: b._id,
      userEmail: b.user.email,
      roomName: b.room.name,
      checkInDate: b.checkInDate,
      checkOutDate: b.checkOutDate,
      status: b.status,
    }));

    res.status(200).json({ success: true, bookings: formattedBookings });
  } catch (error) {
    res.status(500).json({ success: false, message: error.message });
  }
};
