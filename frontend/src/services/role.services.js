import api from "@/services/api";

export const getRoles = async () => {
  const response = await api.get("/roles");
  return response.data;
};

export const getRolePermissionId = async (id) => {
  const response = await api.get(`/roles/${id}/permissions`);
  console.log("response", response.data);
  return response.data;
};
