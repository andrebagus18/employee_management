import { getDailyReports } from "@/services/dailyreport.service";
import { useState, useCallback, useEffect } from "react";
import { showError, showSuccess } from "@/lib/alert";
import { createDailyReport } from "../services/dailyreport.service";
import { useNavigate } from "react-router-dom";

export function useDailyReports() {
  const [reports, setReports] = useState([]);
  const [loading, setLoading] = useState(false);
  const [form, setForm] = useState({
    report_date: "",
    start_time: "",
    end_time: "",
    report: "",
  });
  const [errors, setErrors] = useState({});
  const navigate = useNavigate();

  const fetchDailyReports = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getDailyReports();
      // console.log("response report", response.getReports);
      setReports(response.getReports);
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to load reports");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDailyReports();
  }, [fetchDailyReports]);

  const create = async (data) => {
    try {
      setLoading(true);
      const response = await createDailyReport(data);
      showSuccess(response.msg);
      setErrors({});
      setForm({
        report_date: "",
        start_time: "",
        end_time: "",
        report: "",
      });
      navigate("/daily-reports");
      await fetchDailyReports();
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed o create Daily report");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      report_date: form.report_date,
      start_time: form.start_time,
      end_time: form.end_time,
      report: form.report,
    };
    if (!data) return;
    await create(data);
  };

  return {
    fetchDailyReports,
    loading,
    reports,
    errors,
    form,
    handleChange,
    handleSubmit,
  };
}
