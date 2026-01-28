import { api } from "../config/api";

export const registerRequest = async (values) => {
  const { data } = await api.post("/register", values);
  return data;
};

export const loginRequest = async (values) => {
  const res = await api.post("/login", values);
  console.log("login response", res.status, res.data);
  return res.data;
};

export const getAuthUser = async () => {
  const { data } = await api.get("/auth-user");
  return data;
};
