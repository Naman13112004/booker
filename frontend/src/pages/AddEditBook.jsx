// pages/AddEditBook.jsx
// ----------------------------------------------------
// Add or Edit a book
// ----------------------------------------------------

import { useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosClient";

const AddEditBook = () => {
  const { id } = useParams(); // If editing
  const navigate = useNavigate();
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    genre: "",
    year: 1900,
  });

  useEffect(() => {
    if (id) {
      const fetchBook = async () => {
        try {
          const res = await api.get(`/books/${id}`);
          // Make sure we extract the book data correctly
          const bookData = res.data?.data?.book || res.data; 
          setForm({
            title: bookData.title || "",
            author: bookData.author || "",
            description: bookData.description || "",
            genre: bookData.genre || "",
            year: bookData.year || 1900,
          });
        } catch (err) {
          console.error("Failed to fetch book:", err);
        }
      };
      fetchBook();
    }
  }, [id]);

  const handleChange = (e) => {
    const { name, value } = e.target;

    setForm({
      ...form,
      [name]: name === "year" ? Number(value) : value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (id) {
      await api.patch(`/books/${id}`, form);
    } else {
      await api.post("/books", form);
    }
    navigate("/books");
  };

  return (
    <div className="max-w-lg mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">
        {id ? "Edit Book" : "Add New Book"}
      </h2>
      <form onSubmit={handleSubmit} className="space-y-3">
        {["title", "author", "description", "genre", "year"].map((field) => (
          <input
            key={field}
            name={field}
            value={form[field]}
            onChange={handleChange}
            placeholder={field}
            className="w-full p-2 border rounded"
            required
          />
        ))}
        <button className="bg-blue-600 text-white px-4 py-2 rounded">
          {id ? "Update" : "Add"}
        </button>
      </form>
    </div>
  );
};

export default AddEditBook;
