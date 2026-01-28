import { api } from "../config/api";

export const getTracks = async () => {
  const { data } = await api.get("/tracks");
  return data.data.map((item) => ({ ...item, id: item._id }));
};

export const getTrackById = async (id) => {
  const { data } = await api.get(`/tracks/${id}`);
  return {...data.data, id: data.data._id};
};
