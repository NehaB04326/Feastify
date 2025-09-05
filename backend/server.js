import dotenv from "dotenv";
dotenv.config();

import app from "./app.js";
import adminRoutes from "./routes/adminRoutes.js";
import userRoutes from "./routes/userRoutes.js";

const PORT = process.env.PORT || 4000;

// Register routes BEFORE starting the server
app.use("/api/v1/admin", adminRoutes);
app.use("/api/v1/user", userRoutes);

app.listen(PORT, () => {
  console.log(`Server running on port ${PORT}`);
});
