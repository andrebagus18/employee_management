import api from "./api";

export const getDailyReports = async (params = {}) => {
  const response = await api.get("/daily-reports", { params });
  // console.log("service:", response.data);
  return response.data;
};

export const createDailyReport = async (data) => {
  const response = await api.post("/daily-reports/create", data);
  return response.data;
};

export const updateDailyReport = async (id, data) => {
  const response = await api.patch(`/daily-reports/${id}/update`, data);
  // console.log("response.data:", response.data);
  return response.data;
};
