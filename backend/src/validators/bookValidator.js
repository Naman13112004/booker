// validators/bookValidator.js
// ------------------------------------
// Zod validators for book routes
// ------------------------------------

import { z } from "zod";

const validate = (schema) => async (req, res, next) => {
  try {
    // allow partial for update; pass-through the validated object
    req.body = await schema.parseAsync(req.body);
    return next();
  } catch (err) {
    const error = new Error(err.errors ? err.errors.map(e => `${e.path.join(".")}: ${e.message}`).join("; ") : err.message);
    error.statusCode = 400;
    return next(error);
  }
};

// Schema for creating a book (all required)
const createBookSchema = z.object({
  title: z.string().min(1, "Title is required"),
  author: z.string().min(1, "Author is required"),
  description: z.string().min(5, "Description is required"),
  genre: z.string().min(1, "Genre is required"),
  year: z.number().int().gte(0, "Invalid year"),
});

// Schema for updating a book (partial allowed)
const updateBookSchema = z.object({
  title: z.string().min(1).optional(),
  author: z.string().min(1).optional(),
  description: z.string().min(5).optional(),
  genre: z.string().min(1).optional(),
  year: z.number().int().gte(0).optional(),
});

export const validateCreateBook = validate(createBookSchema);
export const validateUpdateBook = validate(updateBookSchema);
