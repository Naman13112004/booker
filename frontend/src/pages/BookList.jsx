// pages/BookList.jsx
// ----------------------------------------------------
// Shows paginated list of books
// ----------------------------------------------------

import { useEffect, useState } from "react";
import api from "../api/axiosClient";
import BookCard from "../components/BookCard";
import Pagination from "../components/Pagination";
import { useNavigate } from "react-router-dom";

const BookList = () => {
  const [books, setBooks] = useState([]);
  const [page, setPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchBooks = async () => {
      const res = await api.get(`/books?page=${page}&limit=5`);
      setBooks(res.data.books);
      setTotalPages(res.data.totalPages);
    };
    fetchBooks();
  }, [page]);

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">Books</h2>
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {books.map((book) => (
          <BookCard
            key={book._id}
            book={book}
            onSelect={(id) => navigate(`/books/${id}`)}
          />
        ))}
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
