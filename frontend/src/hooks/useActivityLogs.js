import { useCallback, useState } from "react";
import { getActivityLogs } from "@/services/activityLog.services";

export function useActivityLogs() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  });

  const getActivities = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const response = await getActivityLogs();
      setActivities(response.activity);
      setPagination(response.pagination);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return { getActivities, activities, loading, pagination, error };
}
