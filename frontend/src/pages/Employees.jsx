import { NavLink } from "react-router-dom";
import { CirclePlus, Users2, LoaderCircle } from "lucide-react";
import EmployeeFilters from "@/molecules/EmployeeFilters";
import EmployeeTable from "@/organisms/EmployeeTable";
import { useEmployees } from "@/hooks/useEmployees";
import { showError } from "../lib/alert";
import { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Employees() {
  const {
    employees,
    employee,
    loading,
    actionLoading,
    error,
    fetchEmployees,
    search,
    setSearch,
    departmentId,
    setDepartmentId,
    positionId,
    setPositionId,
    status,
    setStatus,
    pagination,
    resetFilters,
    handleActivate,
    handleDeactivate,
  } = useEmployees();
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchEmployees({
        page: 1,
        limit: 10,
        search,
        departmentId,
        positionId,
        status,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchEmployees, search, departmentId, positionId, status]);
  useEffect(() => {
    if (error) {
      showError(error.response?.data?.msg || "Failed to load employees.");
    }
  }, [error]);

  const handlePageChange = (page) => {
    fetchEmployees({
      page,
      limit: pagination.limit,
      search,
      departmentId,
      positionId,
      status,
    });
  };

  const handleLimitChange = (limit) => {
    fetchEmployees({
      page: 1,
      limit: Number(limit),
      search,
      departmentId,
      positionId,
      status,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="flex items-center gap-2 text-2xl font-semibold">
          Employees <Users2 className="text-slate-400" />
        </h1>
        <p className="text-muted-foreground">
          Manage the organization's employees.
        </p>
      </div>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <EmployeeFilters
          search={search}
          setSearch={setSearch}
          departmentId={departmentId}
          setDepartmentId={setDepartmentId}
          positionId={positionId}
          setPositionId={setPositionId}
          status={status}
          setStatus={setStatus}
        />
        <NavLink
          to={"/employees/create"}
          className="flex items-center justify-center max-w-42 w-full bg-black text-white gap-4 py-2 rounded-md text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Employee
        </NavLink>
      </div>

      {/* Table */}
      <EmployeeTable
        employees={employees}
        employee={employee}
        loading={loading}
        actionLoading={actionLoading}
        onResetFilters={resetFilters}
        onActivate={handleActivate}
        onDeactivate={handleDeactivate}
      />
      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {pagination.total === 0
            ? 0
            : (pagination.page - 1) * pagination.limit + 1}{" "}
          – {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
          {pagination.total} employees
        </div>

        <div className="flex items-center gap-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePageChange(pagination.page - 1)}
                  className={
                    pagination.page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>

              {Array.from(
                { length: pagination.totalPage },
                (_, index) => index + 1,
              ).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={pagination.page === page}
                    onClick={() => handlePageChange(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}

              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePageChange(pagination.page + 1)}
                  className={
                    pagination.page === pagination.totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default Employees;
