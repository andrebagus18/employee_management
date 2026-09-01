import { getJobLevels } from "@/services/jobLevel.services";
import { useCallback, useState, useEffect } from "react";

export function useJobLevels() {
  const [jobLevels, setJobLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchJobLevels = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getJobLevels();
      return setJobLevels(data.jobLevels);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchJobLevels();
  }, [fetchJobLevels]);

  return {
    jobLevels,
    loading,
  };
}
