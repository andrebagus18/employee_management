import api from "@/services/api";

export const getEmployees = async () => {
  const response = await api.get("/employees");
  //   console.log("employee:", response.data);
  return response.data;
};

export const createEmployee = async (data) => {
  const response = await api.get("/employees/create", data);
  return response.data;
};
