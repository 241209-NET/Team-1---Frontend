import axios from "axios";

export const axiosInstance = axios.create({
  baseURL: import.meta.env.API_URL,
  headers: {
    "Content-Type": "application/json",
  },
});
