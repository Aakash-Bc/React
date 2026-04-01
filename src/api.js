import axios from "axios";

const API = axios.create({
  baseURL: import.meta.env.VITE_API_URL // Vite project
  // baseURL: process.env.REACT_APP_API_URL // CRA project
});

export default API;