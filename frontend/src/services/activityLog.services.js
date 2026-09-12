import api from "@/services/api";

export const getActivityLogs = async (params = {}) => {
  const response = await api.get("/activity-logs", { params });
  // console.log("response:", response.data);
  return response.data;
};
