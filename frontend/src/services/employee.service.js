import api from "@/services/api";

export const getEmployees = async (params = {}) => {
  const response = await api.get("/employees", { params });
  //   console.log("employee:", response.data);
  return response.data;
};

export const getEmployeeById = async (id) => {
  const response = await api.get(`/employees/${id}`);
  // console.log("employeeId2:", response.data);
  return response.data;
};

export const createEmployee = async (data) => {
  const response = await api.post("/employees/create", data);
  return response.data;
};
