// api/axiosClient.js
// ----------------------------------------------------
// Axios client with baseURL, interceptors for JWT
// ----------------------------------------------------

import axios from "axios";

// Create Axios instance
const axiosClient = axios.create({
  baseURL: "https://booker-p26c.onrender.com/", // backend base URL
  headers: {
    "Content-Type": "application/json",
  },
});

// Request interceptor → attach JWT token if available
axiosClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token"); // we’ll store JWT here
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

// Response interceptor → handle errors globally
axiosClient.interceptors.response.use(
  (response) => response,
  (error) => {
    console.error("API Error:", error.response?.data || error.message);
    return Promise.reject(error);
  }
);

export default axiosClient;
