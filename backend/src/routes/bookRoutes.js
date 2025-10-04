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
  getMyBooks
} from "../controllers/bookController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateCreateBook, validateUpdateBook } from "../validators/bookValidator.js";

const router = express.Router();

// Protected
router.get("/mine", authMiddleware, getMyBooks);
router.post("/", authMiddleware, validateCreateBook, createBook);
router.patch("/:id", authMiddleware, validateUpdateBook, updateBook);
router.delete("/:id", authMiddleware, deleteBook);

// Public
router.get("/", getBooks);
router.get("/:id", getBookById);


export default router;
