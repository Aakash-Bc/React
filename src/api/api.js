import axios from "axios";

// Default to Render URL if env variable is missing
const BASE_URL = import.meta.env.VITE_API_URL || "https://backend-lhhh.onrender.com/api/";

console.log("Connecting to API at:", BASE_URL);

const api = axios.create({
  baseURL: BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  }
});

// Optional: Add request interceptor for easier debugging
api.interceptors.request.use(request => {
  console.log('Starting Request', JSON.stringify(request, null, 2));
  return request;
});

api.interceptors.response.use(response => {
  console.log('Response:', JSON.stringify(response, null, 2));
  return response;
}, error => {
  console.error('API Error:', error.response || error.message);
  return Promise.reject(error);
});

export default api;