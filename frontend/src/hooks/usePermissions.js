import {
  getPermissions,
  createPermission,
  updatePermission,
  deletePermission,
} from "@/services/permission.service";
import { useState, useCallback, useEffect } from "react";
import { showError, showSuccess } from "@/lib/alert";
import { useNavigate } from "react-router-dom";
import { showConfirm } from "../lib/alert";

export function usePermissions({ id } = {}) {
  const navigate = useNavigate();
  const [permissions, setPermissions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);
  const [form, setForm] = useState({
    name: "",
    description: "",
  });
  const [search, setSearch] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  });

  const fetchPermissions = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await getPermissions(params);
      setPermissions(response.permissions);
      setPagination(response.pagination);
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to load permissions");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchPermissions();
  }, [fetchPermissions]);

  const create = async (data) => {
    try {
      setLoading(true);
      const response = await createPermission(data);
      showSuccess(response.msg);
      setOpen(false);
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to create permission");
    } finally {
      setLoading(false);
    }
  };

  const update = async (id, data) => {
    try {
      setLoading(true);
      const response = await updatePermission(id, data);
      showSuccess(response.msg);
      setForm({
        name: "",
        description: "",
      });
      setOpen(false);
      await fetchPermissions();
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to update permission");
    } finally {
      setLoading(false);
    }
  };

  const deleted = async (id) => {
    const result = await showConfirm({
      title: "Delete permission",
      text: "This permission will be permanently.",
      confirmText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      setLoading(true);
      const response = await deletePermission(id);
      showSuccess(response.msg);
      await fetchPermissions();
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to delete permission");
    } finally {
      setLoading(false);
    }
  };

  const resetFilters = () => {
    setSearch("");
  };

  const handleCancel = () => {
    setForm({
      name: "",
      description: "",
    });
    setOpen(false);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setForm((prev) => ({
      ...form,
      [name]: value,
    }));
    setErrors((prev) => ({
      ...prev,
      [name]: "",
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errorField = {};
    const requiredField = [
      ["name", "Name"],
      ["description", "Description"],
    ];
    requiredField.forEach(([field, label]) => {
      if (!String(form[field]).trim()) {
        errorField[field] = `${label} is required`;
      }
    });
    setErrors(errorField);
    if (Object.keys(errorField).length === 0) {
      const data = {
        name: form.name.trim(),
        description: form.description.trim(),
      };
      if (id) {
        await update(id, data);
        navigate("/permissions");
      } else {
        await create(data);
      }
    }
  };

  return {
    permissions,
    fetchPermissions,
    loading,
    form,
    setForm,
    errors,
    open,
    setOpen,
    search,
    setSearch,
    pagination,
    resetFilters,
    handleCancel,
    handleChange,
    handleSubmit,
    deleted,
  };
}
