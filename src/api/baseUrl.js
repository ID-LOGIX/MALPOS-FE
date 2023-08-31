import axios from "axios";

const api = axios.create({
  baseURL: "http://127.0.0.1:8000/api/",
  // baseURL: "http://idlogix.utis.pk:8089/malpos-api/public/api/",
});

api.interceptors.request.use((config) => {
  const token = localStorage.getItem("token");
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

export default api;
