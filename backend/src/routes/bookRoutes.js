// routes/bookRoutes.js
// ------------------------------------
// Book routes
// ------------------------------------

import express from "express";
import {
  createBook,
  getBooks,
  getBookById,
  updateBook,
  deleteBook,
} from "../controllers/bookController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateCreateBook, validateUpdateBook } from "../validators/bookValidator.js";

const router = express.Router();

// Public
router.get("/", getBooks);
router.get("/:id", getBookById);

// Protected
router.post("/", authMiddleware, validateCreateBook, createBook);
router.patch("/:id", authMiddleware, validateUpdateBook, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

export default router;
