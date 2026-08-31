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

function EmployeeTable({ employees }) {
  return (
    <div className="rounded-lg border">
      <Table>
        <TableHeader>
          <TableRow>
            <TableHead>Name</TableHead>
            <TableHead>Department</TableHead>
            <TableHead>Position</TableHead>
            <TableHead>Job Level</TableHead>
            <TableHead>Status</TableHead>
            <TableHead className="w-[50px]"></TableHead>
          </TableRow>
        </TableHeader>

        <TableBody>
          {employees.map((employee) => (
            <TableRow key={employee.id}>
              <TableCell>
                <div>
                  <p className="font-medium">{employee.name}</p>
                  <p className="text-sm text-muted-foreground">
                    {employee.email}
                  </p>
                </div>
              </TableCell>
              <TableCell>{employee.department}</TableCell>
              <TableCell>{employee.position}</TableCell>
              <TableCell>{employee.jobLevel}</TableCell>
              <TableCell>
                <Badge
                  variant={
                    employee.status === "Active" ? "default" : "secondary"
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
                      onClick: () => console.log("VIEW", employee.id),
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
