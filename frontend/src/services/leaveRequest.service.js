import api from "@/services/api";

export const getLeaveRequests = async (params = {}) => {
  const response = await api.get("/leave-requests", { params });
  //   console.log("response:", response.data);
  return response.data;
};

export const getLeaveById = async (id) => {
  const response = await api.get(`/leave-requests/${id}`);
  console.log("service:", response.data);
  return response.data;
};

export const createLeaveRequest = async (data) => {
  const response = await api.post("/leave-requests/create", data);
  return response.data;
};

export const approveLeave = async (id) => {
  const response = await api.patch(`/leave-requests/${id}/status`);
  return response.data;
};

export const rejectLeave = async (id) => {
  const response = await api.patch(`/leave-requests/${id}/status`);
  return response.data;
};
