// controllers/bookController.js
// ------------------------------------
// Book CRUD + pagination + search/filter
// ------------------------------------

import Book from "../models/Book.js";
import Review from "../models/Review.js";

/**
 * Helper: compute & update book's average rating & review count
 * Uses aggregation to be accurate.
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
    // No reviews: reset
    await Book.findByIdAndUpdate(bookId, {
      averageRating: 0,
      reviewsCount: 0,
    });
  }
};

/**
 * @route POST /api/books
 * @desc Create a book (authenticated)
 * @access Private
 */
export const createBook = async (req, res, next) => {
  try {
    const { title, author, description, genre, year } = req.body;

    const book = await Book.create({
      title,
      author,
      description,
      genre,
      year,
      addedBy: req.user._id,
    });

    res.status(201).json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

/**
 * @route GET /api/books
 * @desc Get paginated list of books (5 per page)
 * Query params: page, search, genre, sort (year|rating)
 * @access Public
 */
export const getBooks = async (req, res, next) => {
  try {
    const page = Math.max(1, parseInt(req.query.page) || 1);
    const limit = 5;
    const skip = (page - 1) * limit;

    // Filters
    const filters = {};
    if (req.query.search) {
      // text search on title and author (case-insensitive)
      const q = req.query.search.trim();
      filters.$or = [
        { title: { $regex: q, $options: "i" } },
        { author: { $regex: q, $options: "i" } },
      ];
    }
    if (req.query.genre) {
      filters.genre = req.query.genre;
    }

    // Sorting
    let sort = { createdAt: -1 }; // default newest
    if (req.query.sort === "year") sort = { year: -1 };
    if (req.query.sort === "rating") sort = { averageRating: -1 };

    const [books, total] = await Promise.all([
      Book.find(filters)
        .sort(sort)
        .skip(skip)
        .limit(limit)
        .select("-__v")
        .populate("addedBy", "name email"),
      Book.countDocuments(filters),
    ]);

    res.json({
      success: true,
      meta: {
        page,
        perPage: limit,
        total,
        totalPages: Math.ceil(total / limit),
      },
      data: books,
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route GET /api/books/:id
 * @desc Get single book details + reviews (paginated optional)
 * @access Public
 */
export const getBookById = async (req, res, next) => {
  try {
    const bookId = req.params.id;

    const book = await Book.findById(bookId).populate("addedBy", "name email");
    if (!book) {
      const err = new Error("Book not found");
      err.statusCode = 404;
      return next(err);
    }

    // Get reviews (most recent first). You can add pagination later.
    const reviews = await Review.find({ bookId: book._id })
      .sort({ createdAt: -1 })
      .populate("userId", "name");

    res.json({
      success: true,
      data: {
        book,
        reviews,
      },
    });
  } catch (err) {
    next(err);
  }
};

/**
 * @route PATCH /api/books/:id
 * @desc Update a book (only owner)
 * @access Private
 */
export const updateBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      const err = new Error("Book not found");
      err.statusCode = 404;
      return next(err);
    }

    // Only owner can update
    if (book.addedBy.toString() !== req.user._id.toString()) {
      const err = new Error("Not authorized to update this book");
      err.statusCode = 403;
      return next(err);
    }

    // Update allowed fields
    const allowed = ["title", "author", "description", "genre", "year"];
    allowed.forEach((field) => {
      if (req.body[field] !== undefined) {
        book[field] = req.body[field];
      }
    });

    await book.save();
    res.json({ success: true, data: book });
  } catch (err) {
    next(err);
  }
};

/**
 * @route DELETE /api/books/:id
 * @desc Delete a book (only owner). Also remove related reviews.
 * @access Private
 */
export const deleteBook = async (req, res, next) => {
  try {
    const bookId = req.params.id;
    const book = await Book.findById(bookId);
    if (!book) {
      const err = new Error("Book not found");
      err.statusCode = 404;
      return next(err);
    }

    // Only owner can delete
    if (book.addedBy.toString() !== req.user._id.toString()) {
      const err = new Error("Not authorized to delete this book");
      err.statusCode = 403;
      return next(err);
    }

    // Delete book and its reviews
    await Review.deleteMany({ bookId: book._id });
    await book.remove();

    res.json({ success: true, message: "Book and its reviews deleted" });
  } catch (err) {
    next(err);
  }
};
