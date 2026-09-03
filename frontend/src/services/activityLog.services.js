import api from "@/services/api";

export const getActivityLogs = async () => {
  const response = await api.get("/activity-logs");
  // console.log("response:", response.data);
  return response.data;
};
