import {
  getPositions,
  updatePosition,
  createPosition,
  deletePosition,
} from "@/services/position.service";
import { useCallback, useState, useEffect } from "react";
import { showConfirm, showError, showSuccess } from "../lib/alert";
import { useNavigate } from "react-router-dom";

export function usePositions({ id } = {}) {
  const navigate = useNavigate();
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [open, setOpen] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
    departmentId: "",
  });
  const [pagination, setPagination] = useState({
    psge: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  });
  const [search, setSearch] = useState("");
  const [departmentId, setDepartmentId] = useState("");

  const fetchPositions = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const data = await getPositions(params);
      setPositions(data.positions);
      setPagination(data.pagination);
    } catch (error) {
      // console.error(error);
      setErrors(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  const resetFilters = () => {
    setSearch("");
    setDepartmentId("");
  };

  const create = async () => {
    try {
      setLoading(true);
      const respone = await createPosition(form);
      await showSuccess(respone.msg);
      setForm({ name: "", departmentId: "" });
      setErrors({});
      setOpen(false);
      return respone;
    } catch (error) {
      showError(error.respone?.data?.msg || "Failed to create position");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    try {
      setLoading(true);
      const response = await updatePosition(id, data);
      await showSuccess(response.msg);
      setForm({ name: "", departmentId: "" });
      setErrors({});
      setOpen(false);
      await fetchPositions();
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to update position");
    } finally {
      setLoading(false);
    }
  };

  const handleChange = (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const deleted = async (id) => {
    const result = await showConfirm({
      title: "Delete Position?",
      text: "This position will be permanently deleted.",
      confirmText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      setLoading(true);
      const response = await deletePosition(id);
      await showSuccess(response.msg);
      await fetchPositions();
    } catch (error) {
      showError(error.respone?.data?.msg || "Failed to delete position");
    } finally {
      setLoading(false);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim() && !form.departmentId) return;
    const data = {
      name: form.name.trim(),
      departmentId: Number(form.departmentId),
    };
    if (id) {
      await update(id, data);
      navigate("/positions");
    } else {
      await create(data);
    }
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return {
    positions,
    loading,
    open,
    setOpen,
    errors,
    fetchPositions,
    form,
    setForm,
    handleChange,
    handleSubmit,
    handleCancel,
    deleted,
    search,
    setSearch,
    departmentId,
    setDepartmentId,
    pagination,
    resetFilters,
  };
}
