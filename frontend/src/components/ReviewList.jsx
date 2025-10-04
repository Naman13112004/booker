// components/ReviewList.jsx
// ----------------------------------------------------
// Displays a list of reviews for a book
// ----------------------------------------------------

import { AuthContext } from "../contexts/AuthContext";
import { useContext } from "react";

const ReviewList = ({ reviews, onEdit, onDelete }) => {
  const { user } = useContext(AuthContext);

  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet. Be the first!</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border rounded-md p-3 shadow-sm bg-gray-50 dark:bg-gray-800 border-gray-200 dark:border-gray-700"
        >
          <p className="font-semibold text-gray-900 dark:text-gray-100">
            {review.userId?.name || "Anonymous"}
          </p>
          <p className="text-yellow-600 dark:text-yellow-400">⭐ {review.rating}</p>
          <p className="mt-1 text-gray-800 dark:text-gray-200">{review.reviewText}</p>
          {user && (
            <div className="flex gap-2 mt-1">
              <button
                onClick={() => onEdit(review)}
                className="bg-blue-600 text-white px-2 py-1 rounded"
              >
                Edit
              </button>
              <button
                onClick={() => onDelete(review._id)}
                className="bg-red-600 text-white px-2 py-1 rounded"
              >
                Delete
              </button>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
