import api from "@/services/api";

export const getDepartments = async (params = {}) => {
  const response = await api.get("/departments", { params });
  // console.log("department2", response.data.departments);
  return response.data;
};

export const createDepartment = async (data) => {
  const response = await api.post("/departments/create", data);
  return response.data;
};

export const UpdateDepartment = async (id, data) => {
  const response = await api.put(`/departments/${id}/update`, data);
  return response.data;
};

export const deleteDepartment = async (id) => {
  const response = await api.delete(`/departments/${id}/delete`);
  return response.data;
};
