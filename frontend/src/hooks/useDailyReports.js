import { getDailyReports } from "@/services/dailyreport.service";
import { useState, useCallback } from "react";
import { showError, showSuccess } from "@/lib/alert";

export function useDailyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchDailyReports = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getDailyReports();
      console.log("response report", response);
      setReports(response.getReport);
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, []);

  return { fetchDailyReports, loading, reports };
}
