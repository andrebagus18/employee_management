import { useCallback, useEffect, useState } from "react";
import {
  createEmployee,
  getEmployeeById,
  getEmployees,
} from "@/services/employee.service";
import { showError, showSuccess } from "@/lib/alert";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  gender: "",
  nik: "",
  phone: "",
  address: "",
  hire_date: "",
  termination_date: "",
  status: "ACTIVE",
  departmentId: "",
  positionId: "",
  jobLevelId: "",
  managerId: "",
  email: "",
  password: "",
  roleId: "",
};

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(initialForm);

  const navigate = useNavigate();

  //GET
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployees();
      setEmployees(data.employees);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);

  const getEmployeeId = async (id) => {
    try {
      setLoading(true);
      const response = await getEmployeeById(id);
      setEmployee(response.employee);
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  // CREATE
  // ambil input
  const handleChange = (e) => {
    // pertahankan data form, ubah file yang diedit/berubah
    const { name, value } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: value,
    }));
    // hapus error field yang sudah diperbaiki
    setError((prev) => ({
      ...prev,
      [name]: "",
    }));
  };
  // validasi form sebelum dikirim
  const validate = () => {
    const newErrors = {};
    const requiredField = [
      // property, label
      ["name", "Name"],
      ["gender", "Gender"],
      ["nik", "NIK"],
      ["phone", "Phone"],
      ["address", "Address"],
      ["hire_date", "Hire Date"],
      ["departmentId", "Department"],
      ["positionId", "Position"],
      ["jobLevelId", "Job Level"],
      ["email", "Email"],
      ["password", "Password"],
      ["roleId", "Role"],
    ];
    requiredField.forEach(([field, label]) => {
      if (!String(form[field]).trim()) {
        newError[field] = `${label} is required`;
      }
    });
    // error disimpan ke state error
    setErrors(newErrors);
    // jika sudah tidak ada error
    return Object.keys(newErrors).length === 0;
  };
  const create = async (data) => {
    try {
      setLoading(true);
      const response = await createEmployee(data);
      await showSuccess(response.msg);
      setForm(initialForm);
      setErrors({});
      navigate("/employees");
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to create employee");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleSubmit = async (e) => {
    e.preventDefault();
    // kalau validasi gagal STOP
    if (!validate()) {
      return;
    }
    const payload = {
      name: form.name.trim(),
      gender: form.gender.trim(),
      nik: form.nik.trim(),
      phone: form.phone.trim(),
      address: form.address.trim(),
      hire_date: form.hire_date,
      termination_date: form.termination_date || null,
      status: form.status,
      departmentId: Number(form.departmentId),
      positionId: Number(form.positionId),
      jobLevelId: Number(form.jobLevelId),
      managerId: form.managerId ? Number(form.managerId) : null,
      email: form.email.trim(),
      password: form.password.trim(),
      roleId: Number(form.roleId),
    };
    await create(payload);
  };

  return {
    employees,
    employee,
    loading,
    refetch: fetchEmployees,
    form,
    error,
    errors,
    handleSubmit,
    handleChange,
    getEmployeeId,
  };
}
