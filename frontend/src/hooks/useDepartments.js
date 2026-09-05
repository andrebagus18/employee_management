import {
  getDepartments,
  createDepartment,
  UpdateDepartment,
  deleteDepartment,
} from "@/services/department.services";
import { useCallback, useState, useEffect } from "react";
import { showError, showSuccess } from "@/lib/alert";
import { useNavigate } from "react-router-dom";
import { showConfirm } from "../lib/alert";

export function useDepartments({ mode, id } = {}) {
  const navigate = useNavigate();
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState({
    name: "",
  });

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDepartments();
      // console.log("department3:", data);
      return setDepartments(data.departments);
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  const resetForm = () => {
    setForm({ name: "" });
  };

  const create = async (data) => {
    try {
      setLoading(true);
      const response = await createDepartment(form);
      await showSuccess(response.msg);
      setForm({ name: "" });
      setErrors({});
      await fetchDepartments();
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to create department");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    try {
      setLoading(true);
      const response = await UpdateDepartment(id, data);
      await showSuccess(response.msg);
      setErrors({});
      await fetchDepartments();
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to update department");
    } finally {
      setLoading(false);
    }
  };

  const deleted = async (id) => {
    const result = await showConfirm({
      title: "Delete Department?",
      text: "This department will be permanently deleted.",
      confirmText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      setLoading(true);
      const response = await deleteDepartment(id);
      await showSuccess(response.msg);
      await fetchDepartments();
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to delete department");
    } finally {
      setLoading(false);
    }
  };

  const handleCancel = () => {
    resetForm();
    navigate("/departments");
  };

  const handleChange = async (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name.trim()) return;
    const data = {
      name: form.name.trim(),
    };
    if (mode === "edit") {
      await update(id, data);
      navigate("/departments");
    } else {
      await create(data);
    }
  };

  return {
    departments,
    fetchDepartments,
    handleCancel,
    loading,
    handleChange,
    handleSubmit,
    form,
    setForm,
    errors,
    deleted,
  };
}
