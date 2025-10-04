// pages/BookDetails.jsx
// ----------------------------------------------------
// Shows book details + reviews
// ----------------------------------------------------

import { useEffect, useState, useContext } from "react";
import { useParams } from "react-router-dom";
import api from "../api/axiosClient";
import ReviewList from "../components/ReviewList";
import { AuthContext } from "../contexts/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, comment: "" });
  const { user } = useContext(AuthContext);

  useEffect(() => {
    const fetchData = async () => {
      const resBook = await api.get(`/books/${id}`);
      setBook(resBook.data);

      const resReviews = await api.get(`/reviews/${id}`);
      setReviews(resReviews.data);
    };
    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    await api.post(`/reviews/${id}`, newReview);
    const resReviews = await api.get(`/reviews/${id}`);
    setReviews(resReviews.data);
    setNewReview({ rating: 5, comment: "" });
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold">{book.title}</h2>
      <p className="text-gray-700">by {book.author}</p>
      <p className="mt-2">{book.description}</p>
      <p className="mt-2 text-yellow-600">
        ⭐ {book.averageRating} ({book.reviewsCount} reviews)
      </p>

      <h3 className="text-xl mt-6 mb-2">Reviews</h3>
      <ReviewList reviews={reviews} />

      {user && (
        <form
          onSubmit={handleReviewSubmit}
          className="mt-4 space-y-2 border p-3 rounded"
        >
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: e.target.value })
            }
            className="w-full p-2 border rounded"
          >
            {[1, 2, 3, 4, 5].map((r) => (
              <option key={r} value={r}>
                {r} Star{r > 1 && "s"}
              </option>
            ))}
          </select>
          <textarea
            value={newReview.comment}
            onChange={(e) =>
              setNewReview({ ...newReview, comment: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Write your review..."
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            Submit Review
          </button>
        </form>
      )}
    </div>
  );
};

export default BookDetails;
