// routes/authRoutes.js
// ------------------------------------
// Auth routes
// ------------------------------------

import express from "express";
import { signup, login } from "../controllers/authController.js";
import { validateSignup, validateLogin } from "../validators/authValidator.js";

const router = express.Router();

// POST /api/auth/signup
router.post("/signup", validateSignup, signup);

// POST /api/auth/login
router.post("/login", validateLogin, login);

export default router;
