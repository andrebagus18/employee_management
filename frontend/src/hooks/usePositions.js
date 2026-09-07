import {
  getPositions,
  updatePosition,
  createPosition,
} from "@/services/position.service";
import { useCallback, useState, useEffect } from "react";
import { showError, showSuccess } from "../lib/alert";
import { useNavigate } from "react-router-dom";
import { id } from "date-fns/locale";

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

  const fetchPositions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPositions();
      return setPositions(data.positions);
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
  };
}
