import axios from "axios";
import isBrowser from "./isBrowser";

const openFFInstance = axios.create({
  baseURL: "https://world.openfoodfacts.org/api/v2",
});

openFFInstance.interceptors.request.use(async (config: any) => {
  let token = "";
  if (isBrowser) {
    token = `${localStorage.getItem("token") ?? ""}`; // tokens are stored in localstorage with key token
  }
  config.headers = {
    ...config.headers,
    Authorization: `Bearer ${token}`,
  };
  return config;
});

openFFInstance.interceptors.response.use(
  (res) => res.data,
  (err) => {
    console.log(err);
    return Promise.reject(err?.response?.data);
  }
);

export default openFFInstance;