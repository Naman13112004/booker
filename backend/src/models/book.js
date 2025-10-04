// models/Book.js
// ------------------------------------
// Book Schema
// ------------------------------------

import mongoose from "mongoose";

const bookSchema = new mongoose.Schema(
  {
    title: {
      type: String,
      required: [true, "Title is required"],
    },
    author: {
      type: String,
      required: [true, "Author is required"],
    },
    description: {
      type: String,
      required: [true, "Description is required"],
    },
    genre: {
      type: String,
      required: [true, "Genre is required"],
    },
    year: {
      type: Number,
      required: [true, "Published year is required"],
    },
    addedBy: {
      type: mongoose.Schema.Types.ObjectId,
      ref: "User", // reference to User model
      required: true,
    },
  },
  { timestamps: true }
);

const Book = mongoose.model("Book", bookSchema);

export default Book;
