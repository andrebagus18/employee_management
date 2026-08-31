import { NavLink } from "react-router-dom";
import { CirclePlus } from "lucide-react";
import EmployeeFilters from "@/molecules/EmployeeFilters";
import EmployeeTable from "@/organisms/EmployeeTable";

const employees = [
  {
    id: 1,
    name: "John Doe",
    email: "john@company.com",
    department: "Engineering",
    position: "Frontend Developer",
    jobLevel: "Senior",
    status: "Active",
  },
  {
    id: 2,
    name: "Sarah Smith",
    email: "sarah@company.com",
    department: "Human Resources",
    position: "HR Specialist",
    jobLevel: "Mid",
    status: "Active",
  },
  {
    id: 3,
    name: "Michael Lee",
    email: "michael@company.com",
    department: "Finance",
    position: "Accountant",
    jobLevel: "Junior",
    status: "Inactive",
  },
  {
    id: 4,
    name: "Emily Johnson",
    email: "emily@company.com",
    department: "Engineering",
    position: "Backend Developer",
    jobLevel: "Mid",
    status: "Active",
  },
];

function Employees() {
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
          className="flex items-center justify-center max-w-3xs w-full bg-black text-white gap-4 py-2 rounded-md text-md cursor-pointer"
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
