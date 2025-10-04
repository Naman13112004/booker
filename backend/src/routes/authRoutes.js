// routes/authRoutes.js
// ------------------------------------
// Auth routes
// ------------------------------------

import express from "express";
import { signup, login, getUserProfile } from "../controllers/authController.js";
import { validateSignup, validateLogin } from "../validators/authValidator.js";
import authMiddleware from "../middlewares/authMiddleware.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", validateSignup, signup);

// POST /api/auth/login
router.post("/login", validateLogin, login);

// GET /api/auth/profile (private)
router.get("/profile", authMiddleware, getUserProfile);

export default router;
