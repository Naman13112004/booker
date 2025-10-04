// contexts/AuthContext.jsx
// ----------------------------------------------------
// Provides authentication state across the app
// ----------------------------------------------------

import { createContext, useState, useEffect } from "react";
import axiosClient from "../api/axiosClient";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);  // user object
  const [loading, setLoading] = useState(true); // while checking auth

  // Check if user already logged in (token exists)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      // Fetch user profile from backend
      axiosClient.get("/users/profile")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async (email, password) => {
    const res = await axiosClient.post("/auth/login", { email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // Register function
  const register = async (name, email, password) => {
    const res = await axiosClient.post("/auth/register", { name, email, password });
    localStorage.setItem("token", res.data.token);
    setUser(res.data.user);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
