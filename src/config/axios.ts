import i18n from "@/i18n";
import axios from "axios";

const backendUrl: string = import.meta.env.VITE_BACKEND_URL ?? "http://localhost:3000";

const api = axios.create({ baseURL: `${backendUrl}` });

// # interceptors
api.interceptors.request.use((config) => {
  config.headers["Accept-Language"] = i18n.language;
  return config;
});

// interceptor for response
api.interceptors.response.use((res) => {
  if (res.data.token) {
    localStorage.setItem("token", res.data.token);
  }
  return res;
});

export default api;
