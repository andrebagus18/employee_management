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
  const [search, setSearch] = useState("");
  const [action, setAction] = useState("");
  const [entity, setEntity] = useState("");

  const getActivities = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const response = await getActivityLogs(params);
      setActivities(response.activities);
      setPagination(response.pagination);
      // console.log("pagination", response.pagination);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetFilters = () => {
    setSearch("");
    setAction("");
    setEntity("");
  };

  return {
    getActivities,
    activities,
    loading,
    pagination,
    error,
    search,
    setSearch,
    action,
    setAction,
    entity,
    setEntity,
    resetFilters,
  };
}
