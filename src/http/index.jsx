import axios from "axios";
import { jwtDecode } from "jwt-decode";
import { removeUser } from "../store/slices/authSlice";
import store from "../store/"
export const API_URL = "http://localhost:8080/api/v1";

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      const decoded = jwtDecode(token);
      const tokenExpiration = decoded.exp;

      const currentTime = Math.floor(Date.now() / 1000);
      if (tokenExpiration < currentTime) {
        localStorage.removeItem("token");
        store.dispatch(removeUser());
      }
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default $api;
