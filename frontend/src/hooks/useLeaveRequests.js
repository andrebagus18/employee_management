import {
  getLeaveRequests,
  getLeaveById,
  createLeaveRequest,
  updateLeaveRequest,
} from "@/services/leaveRequest.service";
import { showError, showSuccess } from "../lib/alert";
import { useCallback, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export function useLeaveRequests({ id } = {}) {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [leaveRequest, setLeaveRequest] = useState(null);
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

  const fetchLeaveRequests = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const data = await getLeaveRequests(params);
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

  const getLeaveId = async (id) => {
    try {
      setLoading(true);
      const response = await getLeaveById(id);
      console.log("use:", response);
      const leaveRequest = response.getById;
      setLeaveRequest(leaveRequest);
      setForm({
        reviewedBy: leaveRequest.reviewedBy || "-",
        type: leaveRequest.type || "",
        description: leaveRequest.description || "",
        start_date: leaveRequest.start_date || "",
        end_date: leaveRequest.end_date || "",
        status: leaveRequest.status || "",
        reviewedAt: leaveRequest.reviewedAt || "-",
      });
      return response;
    } catch (error) {
      showError(error.response?.data?.msg);
    } finally {
      setLoading(false);
    }
  };

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
      showError(error.response?.data?.msg || "Failed to create leave request");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateLeaveRequest(id, data);
      await showSuccess(response.msg);
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
      showError(error.response?.data?.msg || "Failed to update leave request");
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
    if (id) {
      await update(id, data);
    }
    await create(data);
  };

  return {
    fetchLeaveRequests,
    getLeaveId,
    leaveRequests,
    leaveRequest,
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
