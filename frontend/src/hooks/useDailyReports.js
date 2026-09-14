import {
  getDailyReports,
  createDailyReport,
  updateDailyReport,
} from "@/services/dailyreport.service";
import { useState, useCallback, useEffect } from "react";
import { showError, showSuccess } from "@/lib/alert";
import { useNavigate } from "react-router-dom";

export function useDailyReports({ id } = {}) {
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
  const [search, setSearch] = useState("");
  const [date, setDate] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 15,
    total: 0,
    totalPage: 0,
  });

  const fetchDailyReports = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await getDailyReports(params);
      // console.log("response report", response.getReports);
      setReports(response.getReports);
      setPagination(response.pagination);
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

  const update = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateDailyReport(id, data);
      showSuccess(response.msg);
      setForm({
        report_date: "",
        start_time: "",
        end_time: "",
        report: "",
      });
      setErrors({});
      await fetchDailyReports();
      return response;
    } catch (error) {
      console.error(error);
      showError(error.response?.data?.msg || "Failed to update daily report");
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearch("");
    setDate("");
  };

  const handleCancel = () => {
    setForm({
      report_date: "",
      start_time: "",
      end_time: "",
      report: "",
    });
    navigate("/daily-reports");
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
    if (id) {
      await update(id, data);
      navigate("/daily-reports");
      console.log("sukse");
    } else {
      await create(data);
    }
  };

  return {
    fetchDailyReports,
    loading,
    reports,
    errors,
    form,
    setForm,
    search,
    setSearch,
    date,
    setDate,
    pagination,
    handleChange,
    handleSubmit,
    handleCancel,
    resetFilters,
  };
}
