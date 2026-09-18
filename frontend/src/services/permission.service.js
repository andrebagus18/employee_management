import api from "./api";

export const getPermissions = async (params = {}) => {
  const response = await api.get("/permissions", { params });
  // console.log("resPer:", response.data);
  return response.data;
};

export const createPermission = async (data) => {
  const response = await api.post("/permissions/create", data);
  return response.data;
};

export const updatePermission = async (id, data) => {
  const response = await api.put(`/permissions/${id}/update`, data);
  return response.data;
};

export const deletePermission = async (id) => {
  const response = await api.delete(`/permissions/${id}/delete`);
  return response.data;
};
