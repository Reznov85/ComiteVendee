import axios from 'axios';

// Central axios instance - change baseURL here or use environment variables
// Note: Vite uses import.meta.env instead of process.env
const baseURL = import.meta.env.VITE_API_URL || 'http://localhost:3000';

const api = axios.create({
  baseURL,
  // withCredentials: true, // enable if backend requires cookies
});

export default api;
