import api from "@/services/api";

export const getLeaveRequests = async () => {
  const response = await api.get("/leave-requests");
  //   console.log("response:", response.data);
  return response.data;
};
