import api from "@/services/api";

export const getJobLevels = async (params = {}) => {
  const response = await api.get("/joblevels", { params });
  // console.log("jobLev", response.data);
  return response.data;
};

export const createJobLevel = async (data) => {
  const response = await api.post("/joblevels/create", data);
  // console.log("data", response.data);
  return response.data;
};

export const updateJobLevel = async (id, data) => {
  const response = await api.put(`/joblevels/${id}/update`, data);
  return response.data;
};
