import api from "@/services/api";

export const getDepartments = async () => {
  const response = await api.get("/departments");
  return response.data;
};
