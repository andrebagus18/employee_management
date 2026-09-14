import api from "./api";

export const getDailyReports = async () => {
  const response = await api.get("/daily-reports");
  // console.log("service:", response.data);
  return response.data;
};

export const createDailyReport = async (data) => {
  const response = await api.post("/daily-reports/create", data);
  return response.data;
};
