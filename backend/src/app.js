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
const allowedOrigins = [
  "https://booker-beige.vercel.app",
  "http://localhost:5173",
];

app.use(
  cors({
    origin: function (origin, callback) {
      if (!origin || allowedOrigins.includes(origin)) {
        callback(null, true);
      } else {
        callback(new Error("Not allowed by CORS"));
      }
    },
    credentials: true,
    methods: ["GET", "POST", "PATCH", "DELETE", "PUT", "OPTIONS"],
    allowedHeaders: ["Content-Type", "Authorization"],
  })
);

// Handle preflight OPTIONS requests
app.options("*", cors());

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
