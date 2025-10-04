// validators/reviewValidator.js
// ------------------------------------
// Zod validators for reviews
// ------------------------------------

import { z } from "zod";

const validate = (schema) => async (req, res, next) => {
  try {
    req.body = await schema.parseAsync(req.body);
    return next();
  } catch (err) {
    const error = new Error(err.errors ? err.errors.map(e => `${e.path.join(".")}: ${e.message}`).join("; ") : err.message);
    error.statusCode = 400;
    return next(error);
  }
};

const addReviewSchema = z.object({
  rating: z.number().int().min(1).max(5),
  reviewText: z.string().min(3, "Review text must be at least 3 characters"),
});

const editReviewSchema = z.object({
  rating: z.number().int().min(1).max(5).optional(),
  reviewText: z.string().min(3).optional(),
});

export const validateAddReview = validate(addReviewSchema);
export const validateEditReview = validate(editReviewSchema);
