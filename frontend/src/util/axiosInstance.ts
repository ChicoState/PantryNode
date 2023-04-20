import axios from "axios";
import isBrowser from "./isBrowser";

const axiosInstance = axios.create({
  baseURL: "http://localhost:3001",
});

axiosInstance.interceptors.request.use(async (config: any) => {
  let token = "";
  if (isBrowser) {
    token = `Bearer ${localStorage.getItem("token") ?? ""}`; // tokens are stored in localstorage with key token
  }
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

axiosInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err);
    return Promise.reject(err?.response?.data);
  }
);

export default axiosInstance;
