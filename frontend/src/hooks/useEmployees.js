import { useCallback, useEffect, useState } from "react";
import { getEmployees } from "@/services/employee.service";
import { createEmployee } from "@/services/employee.service";
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
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState({});
  const [form, setForm] = useState(initialForm);

  const navigate = useNavigate();

  //GET
  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
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
    const newError = {};
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
    setError(newError);
    // jika sudah tidak ada error
    return Object.keys(newError).length === 0;
  };
  const create = async (data) => {
    try {
      setLoading(true);
      const response = await createEmployee(data);
      await showSuccess(response.msg);
      setForm(initialForm);
      setError({});
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
    loading,
    refetch: fetchEmployees,
    form,
    error,
    handleSubmit,
    handleChange,
  };
}
