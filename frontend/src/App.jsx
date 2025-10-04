// App.jsx
// ------------------------------------
// Root App component for Booker frontend
// ------------------------------------

import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import { AuthProvider } from "./contexts/AuthContext";

// Components
import Header from "./components/Header";
import Footer from "./components/Footer";
import ProtectedRoute from "./components/ProtectedRoute";

// Pages
import Signup from "./pages/Signup";
import Login from "./pages/Login";
import BookList from "./pages/BookList";
import BookDetails from "./pages/BookDetails";
import AddEditBook from "./pages/AddEditBook";
import Profile from "./pages/Profile";

function App() {
  return (
    <AuthProvider>
      <Router>
        <div className="flex flex-col min-h-screen">
          {/* Global Header */}
          <Header />

          {/* Main Content */}
          <main className="flex-grow container mx-auto px-4 py-6">
            <Routes>
              {/* Public Routes */}
              <Route path="/" element={<BookList />} />
              <Route path="/login" element={<Login />} />
              <Route path="/signup" element={<Signup />} />
              <Route path="/books/:id" element={<BookDetails />} />

              {/* Protected Routes */}
              <Route
                path="/profile"
                element={
                  <ProtectedRoute>
                    <Profile />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/books/add"
                element={
                  <ProtectedRoute>
                    <AddEditBook />
                  </ProtectedRoute>
                }
              />
              <Route
                path="/books/edit/:id"
                element={
                  <ProtectedRoute>
                    <AddEditBook />
                  </ProtectedRoute>
                }
              />
            </Routes>
          </main>

          {/* Global Footer */}
          <Footer />
        </div>
      </Router>
    </AuthProvider>
  );
}

export default App;
