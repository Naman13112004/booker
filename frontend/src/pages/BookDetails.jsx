// pages/BookDetails.jsx
// ----------------------------------------------------
// Shows book details + reviews
// ----------------------------------------------------

import { useEffect, useState, useContext } from "react";
import { useNavigate, useParams } from "react-router-dom";
import api from "../api/axiosClient";
import ReviewList from "../components/ReviewList";
import { AuthContext } from "../contexts/AuthContext";

const BookDetails = () => {
  const { id } = useParams();
  const [book, setBook] = useState(null);
  const [reviews, setReviews] = useState([]);
  const [newReview, setNewReview] = useState({ rating: 5, reviewText: "", _id: "" });
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchData = async () => {
      const resBook = await api.get(`/books/${id}`);
      setBook(resBook.data.data.book);

      const resReviews = await api.get(`/reviews/${id}`);
      setReviews(resReviews.data.reviews);
    };
    fetchData();
  }, [id]);

  const handleReviewSubmit = async (e) => {
    e.preventDefault();
    if (!user) return;

    if(newReview._id) {
      await api.patch(`/reviews/${newReview._id}`, newReview);
      setNewReview({ rating: 5, reviewText: "" });
    } else {
      await api.post(`/reviews/${id}`, newReview);
    }
    
    const resReviews = await api.get(`/reviews/${id}`);
    setReviews(resReviews.data.reviews);
    setNewReview({ rating: 5, reviewText: "" });
  };

  const handleEditReview = (review) => {

    setNewReview({ rating: review.rating, reviewText: review.reviewText, _id: review._id });
  };

  const handleDeleteReview = async (reviewId) => {
    if (!user) return;
    if (!window.confirm("Are you sure you want to delete this review?")) return;

    try {
      await api.delete(`/reviews/${reviewId}`);
      setReviews((prev) => prev.filter((r) => r._id !== reviewId));
      setNewReview({ "rating": 5, "reviewText": "" });
      navigate(`/books/${id}`);
    } catch (err) {
      console.error("Failed to delete review:", err);
    }
  };

  if (!book) return <p>Loading...</p>;

  return (
    <div className="max-w-3xl mx-auto mt-8">
      <h2 className="text-2xl font-bold text-gray-900 dark:text-gray-100">{book.title}</h2>
      <p className="text-gray-700 dark:text-gray-300">by {book.author}</p>
      <p className="mt-2 text-gray-800 dark:text-gray-200">{book.description}</p>
      <p className="mt-2 text-yellow-600 dark:text-yellow-400">
        ⭐ {book.averageRating} ({book.reviewsCount} reviews)
      </p>

      <h3 className="text-xl mt-6 mb-2">Reviews</h3>
      <ReviewList 
        reviews={reviews} 
        onEdit={handleEditReview}
        onDelete={handleDeleteReview}
      />

      {user && (
        <form
          onSubmit={handleReviewSubmit}
          className="mt-4 space-y-2 border p-3 rounded"
        >
          <select
            value={newReview.rating}
            onChange={(e) =>
              setNewReview({ ...newReview, rating: Number(e.target.value) })
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
            value={newReview.reviewText}
            onChange={(e) =>
              setNewReview({ ...newReview, reviewText: e.target.value })
            }
            className="w-full p-2 border rounded"
            placeholder="Write your review..."
          />
          <button className="bg-green-600 text-white px-4 py-2 rounded">
            {newReview._id ? "Edit" : "Submit"} Review
          </button>
        </form>
      )}
    </div>
  );
};

export default BookDetails;
