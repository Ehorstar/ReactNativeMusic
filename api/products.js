import { request } from "./http";

export const ProductsAPI = {
  getAll: () => request("/api/products"),
  getById: (id) => request(`/api/products/${id}`),
  create: (payload) =>
    request("/api/products", { method: "POST", body: JSON.stringify(payload) }),
};
