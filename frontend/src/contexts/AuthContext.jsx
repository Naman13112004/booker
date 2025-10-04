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

  // Setup token in axios headers if available
  const setAuthToken = (token) => {
    if (token) {
      axiosClient.defaults.headers.common["Authorization"] = `Bearer ${token}`;
    } else {
      delete axiosClient.defaults.headers.common["Authorization"];
    }
  };

  // Check if user already logged in (token exists)
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      setAuthToken(token);
      axiosClient
        .get("/auth/profile")
        .then((res) => {
          setUser(res.data.user);
        })
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
          setAuthToken(null);
        })
        .finally(() => setLoading(false));
    } else {
      setLoading(false);
    }
  }, []);

  // Login function
  const login = async ({ email, password }) => {
    const res = await axiosClient.post("/auth/login", { email, password });

    const { token, ...userData } = res.data.data;

    localStorage.setItem("token", token);
    setAuthToken(token);
    setUser(userData);
  };

  // Register function
  const register = async ({ name, email, password }) => {
    const res = await axiosClient.post("/auth/signup", { name, email, password });

    const { token, ...userData } = res.data.data;

    localStorage.setItem("token", token);
    setAuthToken(token);
    setUser(userData);
  };

  // Logout function
  const logout = () => {
    localStorage.removeItem("token");
    setUser(null);
    setAuthToken(null);
  };

  return (
    <AuthContext.Provider value={{ user, loading, login, register, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
