import mongoose from "mongoose";
import validator from "validator";

const reservationSchema = new mongoose.Schema({
  user: {
    type: mongoose.Schema.Types.ObjectId,
    ref: "User", // link reservation to user
    required: true,
  },
  firstName: {
    type: String,
    required: true,
    minLength: [3, "First name must contain at least 3 characters"],
    maxLength: [30, "First name cannot exceed 30 characters"],
  },
  lastName: {
    type: String,
    required: true,
    minLength: [3, "Last name must contain at least 3 characters"],
    maxLength: [30, "Last name cannot exceed 30 characters"],
  },
  email: {
    type: String,
    required: true,
    validate: [validator.isEmail, "Provide a valid email"],
  },
  phone: {
    type: String,
    required: true,
    match: [/^\d{10}$/, "Phone number must be exactly 10 digits"],
  },
  date: {
    type: String,
    required: true,
  },
  time: {
    type: String,
    required: true,
  },
  guests: {
    type: Number,
    required: true,
    min: [1, "Guests must be at least 1"],
    max: [90, "Guests cannot exceed 90"],
  },
});

export const Reservation = mongoose.model("Reservation", reservationSchema);
