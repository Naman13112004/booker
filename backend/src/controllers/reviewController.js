// controllers/reviewController.js
// ------------------------------------
// Review create/edit/delete + update book ratings
// ------------------------------------

import Review from "../models/review.js";
import Book from "../models/book.js";
import asyncHandler from "express-async-handler";

/**
 * Recompute average rating & count for a book
 */
const recomputeBookRating = async (bookId) => {
  const agg = await Review.aggregate([
    { $match: { bookId: bookId } },
    {
      $group: {
        _id: "$bookId",
        avgRating: { $avg: "$rating" },
        count: { $sum: 1 },
      },
    },
  ]);

  if (agg.length > 0) {
    const { avgRating, count } = agg[0];
    await Book.findByIdAndUpdate(bookId, {
      averageRating: Number(avgRating.toFixed(2)),
      reviewsCount: count,
    });
  } else {
    await Book.findByIdAndUpdate(bookId, {
      averageRating: 0,
      reviewsCount: 0,
    });
  }
};

/**
 * @route GET /api/reviews/mine
 * @desc Get all reviews written by logged-in user
 * @access Private
 */
export const getMyReviews = asyncHandler(async (req, res) => {
  const userId = req.user._id;

  const reviews = await Review.find({ userId })
    .populate("bookId", "title author")
    .sort({ createdAt: -1 });

  res.json({
    success: true,
    reviews,
  });
});

/**
 * @route GET /api/reviews/:bookId
 * @desc Get all reviews for a specific book
 * @access Public
 */
export const getReviewsByBook = asyncHandler(async (req, res) => {
  const { bookId } = req.params;

  const book = await Book.findById(bookId);
  if (!book) {
    res.status(404);
    throw new Error("Book not found");
  }

  const reviews = await Review.find({ bookId })
    .populate("userId", "name")
    .sort({ createdAt: -1 }); // latest first

  res.json({
    success: true,
    bookId,
    reviews,
  });
});

/**
 * @route POST /api/reviews/:bookId
 * @desc Add a review to a book
 * @access Private
 */
export const addReview = async (req, res, next) => {
  try {
    const bookId = req.params.bookId;
    const userId = req.user._id;
    const { rating, reviewText } = req.body;

    // Check book exists
    const book = await Book.findById(bookId);
    if (!book) {
      const err = new Error("Book not found");
      err.statusCode = 404;
      return next(err);
    }

    // Prevent multiple reviews by same user on same book
    const existing = await Review.findOne({ bookId, userId });
    if (existing) {
      const err = new Error("You have already reviewed this book");
      err.statusCode = 400;
      return next(err);
    }

    const review = await Review.create({
      bookId,
      userId,
      rating,
      reviewText,
    });

    // Recompute book rating
    await recomputeBookRating(bookId);

    res.status(201).json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

/**
 * @route PATCH /api/reviews/:id
 * @desc Edit own review
 * @access Private
 */
export const editReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      const err = new Error("Review not found");
      err.statusCode = 404;
      return next(err);
    }

    if (review.userId.toString() !== userId.toString()) {
      const err = new Error("Not authorized to edit this review");
      err.statusCode = 403;
      return next(err);
    }

    const { rating, reviewText } = req.body;
    if (rating !== undefined) review.rating = rating;
    if (reviewText !== undefined) review.reviewText = reviewText;

    await review.save();

    // Recompute rating for related book
    await recomputeBookRating(review.bookId);

    res.json({ success: true, data: review });
  } catch (err) {
    next(err);
  }
};

/**
 * @route DELETE /api/reviews/:id
 * @desc Delete own review
 * @access Private
 */
export const deleteReview = async (req, res, next) => {
  try {
    const reviewId = req.params.id;
    const userId = req.user._id;

    const review = await Review.findById(reviewId);
    if (!review) {
      const err = new Error("Review not found");
      err.statusCode = 404;
      return next(err);
    }

    if (review.userId.toString() !== userId.toString()) {
      const err = new Error("Not authorized to delete this review");
      err.statusCode = 403;
      return next(err);
    }

    const bookId = review.bookId;
    await review.deleteOne();

    // Recompute rating for related book
    await recomputeBookRating(bookId);

    res.json({ success: true, message: "Review deleted" });
  } catch (err) {
    next(err);
  }
};
