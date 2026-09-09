import {
  getJobLevels,
  createJobLevel,
  updateJobLevel,
} from "@/services/jobLevel.services";
import { useCallback, useState, useEffect } from "react";
import { showSuccess, showError } from "../lib/alert";
import { useNavigate } from "react-router-dom";

export function useJobLevels({ id } = {}) {
  const [jobLevels, setJobLevels] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
  });
  const navigate = useNavigate();

  const fetchJobLevels = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const data = await getJobLevels(params);
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

  const create = async () => {
    try {
      setLoading(true);
      const response = await createJobLevel(form);
      await showSuccess(response.msg);
      setForm({ name: "" });
      setErrors({});
      setOpen(false);
      navigate("/job-levels");
      await fetchJobLevels();
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to create job level");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateJobLevel(id, data);
      await showSuccess(response.msg);
      setForm({ name: "" });
      setErrors({});
      setOpen(false);
      navigate("/job-levels");
      await fetchJobLevels();
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to update job level");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = async (e) => {
    e.preventDefault();
    setForm((prev) => ({
      ...form,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const data = {
      name: form.name.trim(),
    };
    if (!data) return;
    if (id) {
      await update(id, data);
    } else {
      await create(data);
    }
  };

  return {
    jobLevels,
    fetchJobLevels,
    loading,
    form,
    open,
    setOpen,
    errors,
    setForm,
    handleSubmit,
    handleChange,
  };
}
