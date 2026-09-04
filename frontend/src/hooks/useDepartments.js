import {
  getDepartments,
  createDepartment,
  UpdateDepartment,
} from "@/services/department.services";
import { useCallback, useState, useEffect } from "react";
import { showError, showSuccess } from "@/lib/alert";

export function useDepartments() {
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
      return setDepartments(data.departments);
    } catch (error) {
      setErrors(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const create = async (data) => {
    try {
      setLoading(true);
      const response = await createDepartment(form);
      await showSuccess(response.msg);
      setForm({ name: "" });
      setErrors({});
      getDepartments();
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
      getDepartments();
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to update department");
    } finally {
      setLoading(false);
    }
  };

  const handleUpdate = async (e, id) => {
    e.preventDefault();
    if (!form.name) return;
    const fieldName = {
      name: form.name.trim(),
    };
    await update(id, fieldName);
  };

  const handleChange = async (e) => {
    setForm((prev) => ({
      ...prev,
      [e.target.name]: e.target.value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!form.name) return;
    if (isEdit) {
      const fieldName = {
        name: form.name.trim(),
      };
      await create(fieldName);
    } else {
      const fieldName = {
        name: form.name.trim(),
      };
      await update(id, fieldName);
    }
  };

  return {
    departments,
    fetchDepartments,
    loading,
    handleChange,
    handleSubmit,
    handleUpdate,
    form,
    setForm,
    errors,
  };
}
