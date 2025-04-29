import axios from "axios";
import { removeUser } from "../store/slices/authSlice";
import store from "../store/";
export const API_URL = "http://localhost:8080/api/v1";

const $basicApi = axios.create({
  baseURL: API_URL,
});

const $api = axios.create({
  baseURL: API_URL,
});

$api.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers["Authorization"] = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

$api.interceptors.response.use(
  (response) => response,
  async (error) => {
    if (error.response?.status === 401) {
      localStorage.removeItem("token");
      store.dispatch(removeUser());
      throw new axios.Cancel("Токен просрочен");
    }

    return Promise.reject(error);
  }
);

export { $api, $basicApi };
