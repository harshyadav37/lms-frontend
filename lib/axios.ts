
import axios from "axios";

const configuredBaseUrl = process.env.NEXT_PUBLIC_API_URL?.trim();

if (!configuredBaseUrl) {
  throw new Error("NEXT_PUBLIC_API_URL is not configured");
}

export const API_BASE_URL = configuredBaseUrl.replace(/\/+$/, "");

const api = axios.create({
  baseURL: API_BASE_URL,
  withCredentials: true,
  headers: {
    "Content-Type": "application/json",
  },
});

export default api;
