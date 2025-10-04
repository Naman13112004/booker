// app.js
// ---------------------------
// Express app setup
// ---------------------------

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

import errorHandler from "./middlewares/errorHandler.js";

// Import routes
import authRoutes from "./routes/authRoutes.js";
import bookRoutes from "./routes/bookRoutes.js";
import reviewRoutes from "./routes/reviewRoutes.js";

const app = express();

// ---------------------------
// Middleware
// ---------------------------

// Parse JSON request bodies
app.use(express.json());

// Enable CORS (so frontend can talk to backend)
app.use(cors());

// Secure HTTP headers (basic security)
app.use(helmet());

// Logging requests in console (dev mode)
app.use(morgan("dev"));

// ---------------------------
// Routes
// ---------------------------

// Temporary test route (to verify server works)
app.get("/", (req, res) => {
  res.json({ message: "Welcome to Booker API 📚" });
});

// API Routes 
app.use("/api/auth", authRoutes);     // Signup, Login
app.use("/api/books", bookRoutes);    // CRUD on books
app.use("/api/reviews", reviewRoutes); // CRUD on reviews

// ---------------------------
// Error Handler (last middleware)
// ---------------------------
// This should always be after all routes
app.use(errorHandler);

// ---------------------------
// Export app to use in index.js
// ---------------------------
export default app;
