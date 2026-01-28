import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";

export const HOST = "http://192.168.56.111:4000";
export const API_URL = `${HOST}/api`;

export const api = axios.create({
  baseURL: API_URL,
  timeout: 15000,
});

api.interceptors.request.use(
  async (config) => {
    const token = await AsyncStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error),
);

api.interceptors.response.use(
  (response) => response,
  (error) => Promise.reject(error.response ?? error),
);
