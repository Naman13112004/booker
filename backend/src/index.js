// index.js
// ---------------------------
// Entry point of the backend
// ---------------------------

// Import our express app
import app from "./app.js"; 
import dotenv from "dotenv";
import connectDB from "./config/db.js";

// Load environment variables from .env file
dotenv.config();

const PORT = process.env.PORT || 5000;

// Connect to MongoDB
connectDB();

// Start the server only after DB connection is successful
app.listen(PORT, () => {
  console.log(`🚀 Server running on http://localhost:${PORT}`);
});
