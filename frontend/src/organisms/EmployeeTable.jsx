import ActionMenu from "@/molecules/ActionMenu";
import { Badge } from "@/components/ui/badge";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  Eye,
  Pencil,
  SearchX,
  Trash2,
  RotateCcw,
  UserCheck,
  UserX,
} from "lucide-react";
import { formatDateIndo } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { Button } from "../components/ui/button";
import TableSkeleton from "../molecules/TableSkeleton";

function EmployeeTable({
  employees,
  loading,
  onResetFilters,
  onActivate,
  onDeactivate,
}) {
  const navigate = useNavigate();

  return (
    <div className="rounded-lg border p-2">
      <Table>
        <TableHeader className="sticky top-0 z-10 bg-background">
          <TableRow>
            <TableHead>No.</TableHead>
            <TableHead>Name</TableHead>
            <TableHead>NIK</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Hire Date</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-14"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {loading ? (
            <TableSkeleton />
          ) : (employees ?? []).length > 0 ? (
            employees.map((employee, index) => (
              <TableRow key={employee.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium capitalize">{employee.name}</p>
                    <p className="text-sm text-muted-foreground">
                      {employee.users?.[0]?.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{employee.nik}</TableCell>
                <TableCell>{employee.department?.name}</TableCell>
                <TableCell>{employee.position?.name}</TableCell>
                <TableCell>{formatDateIndo(employee.hire_date)}</TableCell>
                <TableCell>
                  <Badge
                    variant={
                      employee.status === "ACTIVE" ? "default" : "secondary"
                    }
                  >
                    {employee.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  {employee.status === "ACTIVE" ? (
                    <ActionMenu
                      actions={[
                        {
                          label: "View",
                          icon: Eye,
                          onClick: () => navigate(`/employees/${employee.id}`),
                        },
                        {
                          label: "Edit",
                          icon: Pencil,
                          onClick: () =>
                            navigate(`/employees/${employee.id}/update`),
                        },
                        {
                          label: "Deactivate",
                          icon: UserX,
                          variant: "destructive",
                          onClick: () => onDeactivate(employee.id),
                        },
                      ]}
                    />
                  ) : (
                    <ActionMenu
                      actions={[
                        {
                          label: "View",
                          icon: Eye,
                          onClick: () => navigate(`/employees/${employee.id}`),
                        },
                        {
                          label: "Edit",
                          icon: Pencil,
                          onClick: () =>
                            navigate(`/employees/${employee.id}/update`),
                        },
                        {
                          label: "Activate",
                          icon: UserCheck,
                          iconClassName: "text-green-500",
                          className: "text-green-500",
                          onClick: () => onActivate(employee.id),
                        },
                      ]}
                    />
                  )}
                </TableCell>
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={8} className="h-48 text-center">
                <div className="flex flex-col items-center justify-center gap-3">
                  <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                    <SearchX className="size-10 text-muted-foreground animate-[bounce_1.5s_ease-in-out_infinite]" />
                  </div>
                  <div>
                    <p className="font-medium"> No employees found</p>
                    <p className="text-sm text-muted-foreground">
                      Try adjusting your search or filters
                    </p>
                  </div>
                  <Button
                    variant="outline"
                    onClick={onResetFilters}
                    className="gap-2 border border-slate-400/50 cursor-pointer bg-slate-200 hover:bg-slate-400/30"
                  >
                    <RotateCcw className="sixe-4" />
                    Reset Filters
                  </Button>
                </div>
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
}

export default EmployeeTable;
