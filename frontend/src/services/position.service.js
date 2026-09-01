import api from "@/services/api";

export const getPositions = async () => {
  const response = await api.get("/positions");
  // console.log("positions2", response.data);
  return response.data;
};
