// components/ReviewList.jsx
// ----------------------------------------------------
// Displays a list of reviews for a book
// ----------------------------------------------------

const ReviewList = ({ reviews }) => {
  if (!reviews || reviews.length === 0) {
    return <p className="text-gray-500">No reviews yet. Be the first!</p>;
  }

  return (
    <div className="space-y-4">
      {reviews.map((review) => (
        <div
          key={review._id}
          className="border rounded-md p-3 bg-gray-50 shadow-sm"
        >
          <p className="font-semibold">{review.user?.name || "Anonymous"}</p>
          <p className="text-yellow-600">⭐ {review.rating}</p>
          <p className="mt-1">{review.comment}</p>
        </div>
      ))}
    </div>
  );
};

export default ReviewList;
