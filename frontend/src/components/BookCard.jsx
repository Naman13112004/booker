// components/BookCard.jsx
// ----------------------------------------------------
// Card component to display book details
// ----------------------------------------------------

const BookCard = ({ book, onSelect, onEdit, onDelete, user }) => {
  const canEditAndDelete = user && book.addedBy?._id === user._id;

  return (
    <div
      className="border rounded-lg shadow p-6 cursor-pointer hover:shadow-lg transition bg-white dark:bg-gray-800 text-gray-900 dark:text-gray-100 flex justify-between items-center"
      onClick={() => onSelect(book._id)}
    >
      <h3 className="text-lg font-bold text-gray-900 dark:text-gray-100">{book.title}</h3>
      <p className="text-gray-600 dark:text-gray-400">by {book.author}</p>
      <p className="mt-2 text-yellow-600 dark:text-yellow-400">
        ⭐ {book.averageRating?.toFixed(1) || "0.0"} ({book.reviewsCount || 0} reviews)
      </p>
      {canEditAndDelete && (
        <div className="flex gap-2">
          <button
            onClick={(e) => {
              e.stopPropagation(); // Prevent navigating to details
              onEdit(book._id);
            }}
            className="mt-2 bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
          >
            Edit
          </button>
          <button
            onClick={() => onDelete(book._id)}
            className="bg-red-600 text-white px-2 py-1 rounded"
          >
            Delete
          </button>
        </div>
      )}
    </div>
  );
};

export default BookCard;
