// validators/authValidator.js
// ------------------------------------
// Zod validators for auth routes
// ------------------------------------

import { z } from "zod";

/**
 * Middleware factory: runs schema.parseAsync on req.body,
 * forwards errors to next(err) in a friendly format.
 */
const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    return next();
  } catch (err) {
    // zod error -> format to readable message
    const error = new Error(err.errors ? err.errors.map(e => `${e.path.join(".")}: ${e.message}`).join("; ") : err.message);
    error.statusCode = 400;
    return next(error);
  }
};

const signupSchema = z.object({
  name: z.string().min(2, "Name must be at least 2 characters"),
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

const loginSchema = z.object({
  email: z.string().email("Invalid email"),
  password: z.string().min(6, "Password must be at least 6 characters"),
});

export const validateSignup = validate(signupSchema);
export const validateLogin = validate(loginSchema);
