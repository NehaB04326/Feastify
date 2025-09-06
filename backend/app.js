import express from "express";
import cors from "cors";
import dotenv from "dotenv";
import { dbConnection } from "./database/dbConnection.js";
import { errorMiddleware } from "./error/error.js";

// Import routes
import reservationRouter from "./routes/reservationRoute.js";
import adminRouter from "./routes/adminRoutes.js";
import userRouter from "./routes/userRoutes.js";

dotenv.config({ path: "./config/config.env" });

const app = express();

// Middleware
app.use(
    cors({
        origin: [process.env.FRONTEND_URL],
        methods: ["GET", "POST", "PUT", "DELETE", "PATCH"],
        credentials: true,
    })
);
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// Database
dbConnection();

// Routes
app.use("/api/v1/reservation", reservationRouter);
app.use("/api/v1/admin", adminRouter);
app.use("/api/v1/user", userRouter);

// Error handler
app.use(errorMiddleware);

export default app;
