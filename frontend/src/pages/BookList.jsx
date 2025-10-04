// pages/BookList.jsx
// ----------------------------------------------------
// Shows paginated list of books
// ----------------------------------------------------

import { useContext, useEffect, useState } from "react";
import api from "../api/axiosClient";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const BookList = () => {
  const { user } = useContext(AuthContext);

  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  const handleDeleteBook = async (id) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this book?")) return;

    try {
      await api.delete(`/books/${id}`);
      setBooks((prev) => prev.filter((b) => b._id !== id)); 
      navigate("/books");
    } catch (err) {
      console.error("Failed to delete book:", err);
    }
  };

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await api.get(`/books?page=${page}`, {
        headers: {
          "Cache-Control": "no-cache",
        }
      });
      setBooks(res.data?.data || []);
      setTotalPages(res.data?.meta.totalPages || 1);
    };
    fetchBooks();
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books && books.length > 0 ? (
          books.map((book) => (
            <BookCard
              key={book._id}
              book={book}
              onSelect={(id) => navigate(`/books/${id}`)}
              onEdit={(id) => navigate(`/books/edit/${id}`)}
              onDelete={handleDeleteBook}
              user={user}
            />
          ))  
        ) : (
          <p>No books found...</p>
        )} 
      </div>
      <Pagination
        currentPage={page}
        totalPages={totalPages}
        onPageChange={setPage}
      />
    </div>
  );
};

export default BookList;
