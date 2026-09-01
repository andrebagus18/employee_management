import api from "@/services/api";

export const getJobLevels = async () => {
  const response = await api.get("/joblevels");
  return response.data;
};
