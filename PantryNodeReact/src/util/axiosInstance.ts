import axios from "axios";
import isBrowser from "./isBrowser";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3000/api",
});

axiosInstance.interceptors.request.use(async (config: any ) => {
  let token = "";
  if (isBrowser) {
    token = localStorage.getItem("token") ?? ""; // tokens are stored in localstorage with key token
  }
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => Promise.reject(err?.response?.data)
);

export default axiosInstance;
