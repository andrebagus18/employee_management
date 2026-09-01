import api from "@/services/api";

export const getJobLevels = async () => {
  const response = await api.get("/joblevels");
  // console.log("job", response.data);
  return response.data;
};
