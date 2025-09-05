import jwt from "jsonwebtoken";
import { User } from "../models/userSchema.js";
import ErrorHandler from "../error/error.js";

export const isAuthenticated = async (req, res, next) => {
  try {
    // Get the Authorization header
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return next(new ErrorHandler("Please login to access this resource", 401));
    }

    // Extract token string from 'Bearer <token>'
    const token = authHeader.split(" ")[1];

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    req.user = await User.findById(decoded.id);

    if (!req.user) {
      return next(new ErrorHandler("User not found", 404));
    }

    next();
  } catch (error) {
    return next(new ErrorHandler("Authentication failed", 401));
  }
};
