import api from "@/services/api";

export const getPositions = async () => {
  const response = await api.get("/positions");
  return response.data;
};
