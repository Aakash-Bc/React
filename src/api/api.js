import axios from "axios";

console.log("API Base URL:", import.meta.env.VITE_API_URL || "https://backend-lhhh.onrender.com/api/");

const api = axios.create({
  baseURL: import.meta.env.VITE_API_URL || "https://backend-lhhh.onrender.com/api/",
  withCredentials: true,
});

export default api;