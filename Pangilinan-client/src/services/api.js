import axios from "axios";
import constants from "../constants";
import { getToken, logoutUser } from "../utils/auth";

const API = axios.create({
  baseURL: constants.HOST,
});

API.interceptors.request.use((config) => {
  const token = getToken();

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  return config;
});

API.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      logoutUser();
    }

    return Promise.reject(error);
  },
);

export default API;
