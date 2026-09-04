import api from "@/services/api";

export const getDepartments = async () => {
  const response = await api.get("/departments");
  // console.log("department2", response.data);
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
