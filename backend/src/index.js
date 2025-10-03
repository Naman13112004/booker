// index.js
// ---------------------------
// Entry point of the backend
// ---------------------------

import dotenv from "dotenv";
import mongoose from "mongoose";
import app from "./app.js"; // Import our express app

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;
const MONGO_URI = process.env.MONGO_URI || "mongodb://localhost:27017/booker";

// Connect to MongoDB
mongoose
  .connect(MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  })
  .then(() => {
    console.log("✅ Connected to MongoDB");
    // Start the server only after DB connection is successful
    app.listen(PORT, () => {
      console.log(`🚀 Server running on http://localhost:${PORT}`);
    });
  })
  .catch((err) => {
    console.error("❌ MongoDB connection error:", err.message);
    process.exit(1); // Exit process with failure
  });
