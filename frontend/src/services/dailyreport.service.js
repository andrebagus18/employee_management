import api from "./api";

export const getDailyReports = async () => {
  const response = await api.get("/daily-reports");
  return response.data;
};
