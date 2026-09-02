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
import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDateIndo } from "@/lib/utils";
import { useNavigate } from "react-router-dom";

function EmployeeTable({ employees }) {
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
          {(employees ?? []).map((employee, index) => (
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
                      onClick: () => console.log("EDIT", employee.id),
                    },
                    {
                      label: "Delete",
                      icon: Trash2,
                      variant: "destructive",
                      onClick: () => console.log("DELETE", employee.id),
                    },
                  ]}
                />
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </Table>
    </div>
  );
}

export default EmployeeTable;
