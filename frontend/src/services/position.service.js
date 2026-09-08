import api from "@/services/api";

export const getPositions = async (params = {}) => {
  const response = await api.get("/positions", { params });
  // console.log("positions2", response.data);
  return response.data;
};

export const createPosition = async (data) => {
  const response = await api.post("/positions/create", data);
  return response.data;
};

export const updatePosition = async (id, data) => {
  const response = await api.put(`/positions/${id}/update`, data);
  return response.data;
};

export const deletePosition = async (id) => {
  const response = await api.delete(`/positions/${id}/delete`);
  return response.data;
};
