// utils/validators.js
// ----------------------------------------------------
// Simple client-side validation helpers
// ----------------------------------------------------

export const validateEmail = (email) => /\S+@\S+\.\S+/.test(email);

export const validatePassword = (password) => password.length >= 6;

export const validateBookForm = (book) => {
  return (
    book.title.trim() &&
    book.author.trim() &&
    book.description.trim() &&
    book.genre.trim() &&
    /^\d{4}$/.test(book.year) // Must be 4-digit year
  );
};
