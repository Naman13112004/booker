// components/BookCard.jsx
// ----------------------------------------------------
// Card component to display book details
// ----------------------------------------------------

const BookCard = ({ book, onSelect }) => {
  return (
    <div
      className="border rounded-lg shadow p-4 cursor-pointer hover:shadow-lg transition"
      onClick={() => onSelect(book._id)}
    >
      <h3 className="text-lg font-bold">{book.title}</h3>
      <p className="text-gray-600">by {book.author}</p>
      <p className="mt-2 text-yellow-600">
        ⭐ {book.averageRating.toFixed(1)} ({book.reviewsCount} reviews)
      </p>
    </div>
  );
};

export default BookCard;
