import {
  getLeaveRequests,
  createLeaveRequest,
} from "@/services/leaveRequest.service";
import { showError, showSuccess } from "../lib/alert";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    type: "",
    description: "",
    start_date: "",
    end_date: "",
  });
  const [open, setOpen] = useState(false);
  const navigate = useNavigate();

  const fetchLeaveRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getLeaveRequests();
      // console.log("response:", data);
      return setLeaveRequests(data.leaveRequests);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaveRequests();
  }, [fetchLeaveRequests]);

  const create = async (data) => {
    try {
      setLoading(true);
      const response = await createLeaveRequest(data);
      await showSuccess(response.msg);
      setErrors({});
      setForm({
        type: "",
        description: "",
        start_date: "",
        end_date: "",
      });
      navigate("/leave-requests");
      await fetchLeaveRequests();
      return response;
    } catch (error) {
      showError(error.response?.data?.msg);
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
      type: form.type.trim(),
      description: form.description.trim(),
      start_date: form.start_date,
      end_date: form.end_date,
    };
    if (!data) return;
    await create(data);
  };

  return {
    fetchLeaveRequests,
    leaveRequests,
    loading,
    errors,
    form,
    setForm,
    open,
    setOpen,
    handleSubmit,
    handleChange,
  };
}
