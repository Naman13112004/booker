// controllers/authController.js
// ------------------------------------
// Auth: signup, login
// ------------------------------------

import bcrypt from "bcryptjs";
import User from "../models/User.js";
import generateToken from "../utils/generateToken.js";

/**
 * @route POST /api/auth/signup
 * @desc Register new user
 * @access Public
 */
export const signup = async (req, res, next) => {
  try {
    const { name, email, password } = req.body;

    // Check if user exists
    const existing = await User.findOne({ email: email.toLowerCase() });
    if (existing) {
      const err = new Error("Email already in use");
      err.statusCode = 400;
      return next(err);
    }

    // Hash password
    const salt = await bcrypt.genSalt(10);
    const hashed = await bcrypt.hash(password, salt);

    // Create user
    const user = await User.create({
      name,
      email: email.toLowerCase(),
      password: hashed,
    });

    // Return user info + token
    res.status(201).json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route POST /api/auth/login
 * @desc Login user and return token
 * @access Public
 */
export const login = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const user = await User.findOne({ email: email.toLowerCase() });
    if (!user) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      return next(err);
    }

    // Compare password
    const isMatch = await bcrypt.compare(password, user.password);
    if (!isMatch) {
      const err = new Error("Invalid email or password");
      err.statusCode = 401;
      return next(err);
    }

    res.json({
      success: true,
      data: {
        id: user._id,
        name: user.name,
        email: user.email,
        token: generateToken(user._id),
      },
    });
  } catch (err) {
    next(err);
  }
};
