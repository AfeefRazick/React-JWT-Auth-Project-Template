import axios from "axios";

// custom instance of axios used for requests that dont require authentication
export const axiosPublic = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  withCredentials: true,
});

// custom instance of axios used for requests that require authentication
export const axiosPrivate = axios.create({
  baseURL: import.meta.env.VITE_SERVER_URL,
  headers: { "Content-Type": "application/json" },
  withCredentials: true,
});
