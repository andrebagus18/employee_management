import { useCallback, useEffect, useState } from "react";
import {
  createEmployee,
  getEmployeeById,
  getEmployees,
  updateEmployeeId,
} from "@/services/employee.service";
import { showError, showSuccess } from "@/lib/alert";
import { useNavigate } from "react-router-dom";

const initialForm = {
  name: "",
  gender: "",
  nik: "",
  phone: "",
  place_birth: "",
  date_birth: "",
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
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  });
  const [departmentId, setDepartmentId] = useState("");
  const [positionId, setPositionId] = useState("");
  const [status, setStatus] = useState("");
  const [search, setSearch] = useState("");
  const [employee, setEmployee] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [errors, setErrors] = useState({});
  const [form, setForm] = useState(initialForm);

  const navigate = useNavigate();

  //GET
  const fetchEmployees = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      setError(null);
      const data = await getEmployees(params);
      // console.log("params", params);
      // console.log("data:", data);
      setEmployees(data.employees);
      setPagination(data.pagination);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  const resetFilters = () => {
    setSearch("");
    setDepartmentId("");
    setPositionId("");
    setStatus("");
  };

  const getEmployeeId = async (id) => {
    try {
      setLoading(true);
      const response = await getEmployeeById(id);
      const employee = response.employee;
      setEmployee(employee);
      setForm({
        name: employee.name || "",
        gender: employee.gender || "",
        nik: employee.nik || "",
        phone: employee.phone || "",
        place_birth: employee.place_birth || "",
        date_birth: employee.date_birth ? employee.date_birth.slice(0, 10) : "",
        address: employee.address || "",
        hire_date: employee.hire_date ? employee.hire_date.slice(0, 10) : "",
        termination_date: employee.termination_date
          ? employee.termination_date.slice(0, 10)
          : "",
        status: employee.status || "ACTIVE",
        departmentId: employee.departmentId
          ? String(employee.departmentId)
          : "",
        positionId: employee.positionId ? String(employee.positionId) : "",
        jobLevelId: employee.jobLevelId ? String(employee.jobLevelId) : "",
        managerId: employee.managerId ? String(employee.managerId) : "",
        email: employee.users?.[0]?.email || "",
        password: "",
        roleId: employee.users?.[0]?.roleId
          ? String(employee.users[0].roleId)
          : "",
      });
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to load employee");
    } finally {
      setLoading(false);
    }
  };

  // Mode Edit
  const updateEmployee = async (id, data) => {
    try {
      setLoading(true);
      const response = await updateEmployeeId(id, data);
      await showSuccess(response.msg);
      navigate("/employees");
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to update employee");
      throw error;
    } finally {
      setLoading(false);
    }
  };
  const handleUpdate = async (e, id) => {
    e.preventDefault();

    const payload = {
      employee: {
        name: form.name.trim(),
        gender: form.gender,
        nik: form.nik.trim(),
        phone: form.phone.trim(),
        place_birth: form.place_birth || null,
        date_birth: form.date_birth || null,
        address: form.address.trim(),
        hire_date: form.hire_date,
        termination_date: form.termination_date || null,
        status: form.status,
        departmentId: Number(form.departmentId),
        positionId: Number(form.positionId),
        jobLevelId: Number(form.jobLevelId),
        managerId: form.managerId ? Number(form.managerId) : null,
      },
      user: {
        email: form.email.trim(),
        password: form.password.trim(),
        roleId: Number(form.roleId),
      },
    };
    await updateEmployee(id, payload);
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
    setErrors((prev) => ({
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
      ["place_birth", "Place of Birth"],
      ["date_birth", "Date of Birth"],
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
        newErrors[field] = `${label} is required`;
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
      place_birth: form.place_birth.trim(),
      date_birth: form.date_birth,
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
    fetchEmployees,
    form,
    error,
    errors,
    search,
    setSearch,
    departmentId,
    setDepartmentId,
    positionId,
    setPositionId,
    status,
    setStatus,
    handleSubmit,
    handleUpdate,
    handleChange,
    getEmployeeId,
    pagination,
    resetFilters,
    updateEmployee,
  };
}
