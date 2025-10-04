// middlewares/authMiddleware.js
// --------------------------------------------------
// Protect routes using JWT authentication
// --------------------------------------------------

import jwt from "jsonwebtoken";
import User from "../models/User.js";

const authMiddleware = async (req, res, next) => {
  let token;

  // JWT is usually sent in "Authorization: Bearer <token>"
  if (req.headers.authorization && req.headers.authorization.startsWith("Bearer")) {
    token = req.headers.authorization.split(" ")[1]; // Extract token

    try {
      // Verify token
      const decoded = jwt.verify(token, process.env.JWT_SECRET);

      // Attach user info (without password) to request
      req.user = await User.findById(decoded.id).select("-password");

      if (!req.user) {
        // instead of res.json, throw error
        const error = new Error("User not found");
        error.statusCode = 401;
        return next(error);
      }

      return next(); // Continue to the protected route
    } catch (err) {
      err.statusCode = 401; // mark as Unauthorized
      return next(err); // pass to global errorHandler
    }
  }

  // If no token found
  const error = new Error("Not authorized, no token provided");
  error.statusCode = 401;
  return next(error);
};

export default authMiddleware;
