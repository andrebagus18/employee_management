import api from "@/services/api";

export const getRoles = async () => {
  const response = await api.get("/roles");
  return response.data;
};

export const getRolePermissionId = async (id) => {
  const response = await api.get(`/roles/${id}/permissions`);
  // console.log("response", response.data);
  return response.data;
};

export const assignPermission = async (roleId, permissionId) => {
  const response = await api.post(`/roles/${roleId}/permissions`, {
    permissionId,
  });
  // console.log("service", response.data);
  return response.data;
};

export const revokePermission = async (roleId, permissionId) => {
  const response = await api.delete(
    `/roles/${roleId}/permissions/${permissionId}`,
  );
  return response.data;
};
