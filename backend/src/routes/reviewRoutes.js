// routes/reviewRoutes.js
// ------------------------------------
// Review routes
// ------------------------------------

import express from "express";
import { addReview, editReview, deleteReview } from "../controllers/reviewController.js";
import authMiddleware from "../middlewares/authMiddleware.js";
import { validateAddReview, validateEditReview } from "../validators/reviewValidator.js";

const router = express.Router();

// POST /api/reviews/:bookId - add new review for a book
router.post("/:bookId", authMiddleware, validateAddReview, addReview);

// PATCH /api/reviews/:id - edit a review
router.patch("/:id", authMiddleware, validateEditReview, editReview);

// DELETE /api/reviews/:id - delete a review
router.delete("/:id", authMiddleware, deleteReview);

export default router;
