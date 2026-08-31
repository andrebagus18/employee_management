import api from "@/services/api";

export const getEmployees = async () => {
  const response = await api.get("/employees");
  //   console.log("employee:", response.data);
  return response.data;
};
