// components/Header.jsx
// ----------------------------------------------------
// Header with navigation, auth state awareness, and dark mode toggle
// ----------------------------------------------------

import { useContext, useEffect, useState } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../contexts/AuthContext";

const Header = () => {
  const { user, logout } = useContext(AuthContext);

  // Dark mode state (read from localStorage)
  const [darkMode, setDarkMode] = useState(
    localStorage.getItem("theme") === "dark"
  );

  useEffect(() => {
    if (darkMode) {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    } else {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    }
  }, [darkMode]);

  return (
    <header className="bg-blue-600 text-white dark:bg-gray-900 dark:text-gray-100 px-6 py-3 flex justify-between items-center shadow-md">
      {/* Logo / Title */}
      <Link to="/" className="text-xl font-bold">
        📚 Booker
      </Link>

      {/* Navigation */}
      <nav className="space-x-4 flex items-center">
        <Link to="/">Home</Link>
        <Link to="/books">Books</Link>

        {user ? (
          <>
            <span className="font-semibold">Hello, {user.name}</span>
            <button
              onClick={logout}
              className="ml-3 bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/login">Login</Link>
            <Link to="/signup">Signup</Link>
          </>
        )}

        {/* Dark mode toggle */}
        <button
          onClick={() => setDarkMode(!darkMode)}
          className="ml-4 px-3 py-1 rounded bg-gray-200 text-black dark:bg-gray-700 dark:text-white"
        >
          {darkMode ? "☀️ Light" : "🌙 Dark"}
        </button>
      </nav>
    </header>
  );
};

export default Header;
