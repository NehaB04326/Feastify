// controllers/reservation.js
import ErrorHandler from "../error/error.js";
import { Reservation } from "../models/reservationSchema.js";

export const sendReservation = async (req, res, next) => {
  try {
    const { firstName, lastName, email, phone, date, time, guests } = req.body;

    // ✅ Validate required fields
    if (!firstName || !lastName || !email || !phone || !date || !time || !guests) {
      return next(new ErrorHandler("All fields are required", 400));
    }

    // Convert to Date objects
    const requestedTime = new Date(`${date}T${time}`);
    const oneHourLater = new Date(requestedTime.getTime() + 60 * 60000);

    // ✅ Rule 1: Check if same user already booked this slot
    const existingUserReservation = await Reservation.findOne({
      email,
      date,
      time,
    });

    if (existingUserReservation) {
      return next(new ErrorHandler("You already reserved this slot!", 400));
    }

    // ✅ Rule 2: Check guest capacity (90 max per slot)
    const totalGuestsAgg = await Reservation.aggregate([
      { $match: { date, time } },
      { $group: { _id: null, total: { $sum: "$guests" } } },
    ]);

    const totalGuests = totalGuestsAgg.length > 0 ? totalGuestsAgg[0].total : 0;

    if (totalGuests + guests > 90) {
      return next(new ErrorHandler("Slot full, please choose another time", 400));
    }

    // ✅ Rule 3: Check time overlap (1-hour interval rule)
    const overlappingReservation = await Reservation.findOne({
      date,
      time: {
        $gte: requestedTime.toISOString().slice(11, 16), // format to HH:MM
        $lt: oneHourLater.toISOString().slice(11, 16),
      },
    });

    if (overlappingReservation) {
      return next(
        new ErrorHandler("This slot is already reserved within the 1-hour window", 400)
      );
    }

    // ✅ If all checks passed → create reservation
    await Reservation.create({
      user: req.user._id,
      firstName,
      lastName,
      email,
      phone,
      date,
      time,
      guests,
    });

    res.status(201).json({
      success: true,
      message: "Reservation successful!",
    });
  } catch (error) {
    next(error);
  }
};
