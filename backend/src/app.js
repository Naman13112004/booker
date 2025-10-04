// app.js
// ---------------------------
// Express app setup
// ---------------------------

import express from "express";
import cors from "cors";
import helmet from "helmet";
import morgan from "morgan";

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

// In future: app.use("/api/users", userRoutes);
// In future: app.use("/api/books", bookRoutes);
// In future: app.use("/api/reviews", reviewRoutes);

// ---------------------------
// Error Handler (last middleware)
// ---------------------------
// This should always be after all routes
app.use(errorHandler);

// ---------------------------
// Export app to use in index.js
// ---------------------------
export default app;
