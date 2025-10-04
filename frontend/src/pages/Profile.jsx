// pages/Profile.jsx
// ----------------------------------------------------
// Shows user's books and reviews
// ----------------------------------------------------

import { useEffect, useState, useContext } from "react";
import api from "../api/axiosClient";
import { AuthContext } from "../contexts/AuthContext";

const Profile = () => {
  const { user } = useContext(AuthContext);
  const [myBooks, setMyBooks] = useState([]);
  const [myReviews, setMyReviews] = useState([]);

  useEffect(() => {
    const fetchData = async () => {
      const resBooks = await api.get("/books/mine");
      setMyBooks(resBooks.data.books);

      const resReviews = await api.get("/reviews/mine");
      setMyReviews(resReviews.data.reviews);
    };
    fetchData();
  }, []);

  if (!user) return <p>Please login to view your profile.</p>;

  return (
    <div className="max-w-4xl mx-auto mt-8">
      <h2 className="text-2xl font-bold mb-4">My Profile</h2>
      <p className="mb-6">Welcome, {user.name}</p>

      <h3 className="text-xl mb-2">My Books</h3>
      <ul className="list-disc list-inside mb-6">
        {myBooks.map((book) => (
          <li key={book._id}>{book.title}</li>
        ))}
      </ul>

      <h3 className="text-xl mb-2">My Reviews</h3>
      <ul className="list-disc list-inside">
        {myReviews.map((rev) => (
          <li key={rev._id}>
            {rev.book?.title}: ⭐ {rev.rating} — {rev.comment}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default Profile;
