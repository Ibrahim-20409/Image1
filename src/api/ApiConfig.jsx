import axios from "axios";

const FRONT_HIT_URL = "http://localhost:3000";
const API_BASE_URL = "http://127.0.0.1:8000/api";

export const API_ENDPOINTS = {
  LOGIN: `${API_BASE_URL}/login/`,
  ME: `${API_BASE_URL}/login/me/`,
  USERS: `${API_BASE_URL}/users/`,
  USERS_LIST_SEARCH: `${API_BASE_URL}/users/search`,
  SITES: `${API_BASE_URL}/sites/`,
  CONSTELLATION: `${API_BASE_URL}/constellation/`,
  CONSTELLATIONSATLINKS: `${API_BASE_URL}/constellation/satlinks`,
  CALIBRATION: `${API_BASE_URL}/monitoring/start-calibration`,

};

export const axiosInstance = axios.create({
  baseURL: API_BASE_URL,
  headers: {
    "Content-type": "application/json",
  },
});

axiosInstance.interceptors.request.use(
  (config) => {
    const access_token = localStorage.getItem("access_token");

    if (access_token) {
      if (config.url !== "/api/login") {
        config.headers["Authorization"] = "Bearer " + access_token;
      } else {
        localStorage.removeItem("access_token");
        window.location.href = FRONT_HIT_URL + "/login";
      }
    }

    if (config.data && config.data.password && !config.data.identity) {
      console.log("This");
      config.headers["Content-Type"] = "application/x-www-form-urlencoded";
    }
    return config;
  },
  (error) => {
    Promise.reject(error);
  }
);

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    console.log("Error on Return: ", error);
    if (error.response.status === 401 || error.response.status === 403) {
      localStorage.removeItem("access_token");
      window.location.href = FRONT_HIT_URL + "/login";
    }
    return Promise.reject(error);
  }
);
