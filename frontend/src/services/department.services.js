import api from "@/services/api";

export const getDepartments = async () => {
  const response = await api.get("/departments");
  // console.log("department2", response.data);
  return response.data;
};
