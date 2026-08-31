import { NavLink } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import EmployeeFilters from "@/molecules/EmployeeFilters";
import EmployeeTable from "@/organisms/EmployeeTable";
import { useEmployees } from "@/hooks/useEmployees";
import { showError } from "../lib/alert";
import { useEffect } from "react";

function Employees() {
  const { employees, loading, error, refetch } = useEmployees();

  useEffect(() => {
    if (error) {
      showError(error.response?.data?.msg || "Failed to load employees.");
    }
  }, [error]);
  if (loading) {
    return <div>Loading...</div>;
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Employees</h1>
        <p className="text-muted-foreground">
          Manage the organization's employees.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <EmployeeFilters />
        <NavLink
          to={"/employees/create"}
          className="flex items-center justify-center max-w-42 w-full bg-black text-white gap-4 py-2 rounded-md text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Employee
        </NavLink>
      </div>

      {/* Table */}
      <EmployeeTable employees={employees} />
    </div>
  );
}

export default Employees;
