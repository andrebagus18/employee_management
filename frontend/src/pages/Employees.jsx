import { NavLink } from "react-router-dom";
import { CirclePlus, Users2 } from "lucide-react";
import EmployeeFilters from "@/molecules/EmployeeFilters";
import EmployeeTable from "@/organisms/EmployeeTable";
import { useEmployees } from "@/hooks/useEmployees";
import { showError } from "../lib/alert";
import { useEffect } from "react";

function Employees() {
  const {
    employees,
    employee,
    loading,
    error,
    fetchEmployees,
    search,
    setSearch,
  } = useEmployees();
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees({
        page: 1,
        limit: 10,
        search,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchEmployees, search]);
  useEffect(() => {
    if (error) {
      showError(error.response?.data?.msg || "Failed to load employees.");
    }
  }, [error]);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-4 text-2xl font-semibold">
          Employees <Users2 className="text-slate-500" />
        </h1>
        <p className="text-muted-foreground">
          Manage the organization's employees.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <EmployeeFilters search={search} setSearch={setSearch} />
        <NavLink
          to={"/employees/create"}
          className="flex items-center justify-center max-w-42 w-full bg-black text-white gap-4 py-2 rounded-md text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Employee
        </NavLink>
      </div>

      {/* Table */}
      <EmployeeTable employees={employees} employee={employee} />
    </div>
  );
}

export default Employees;
