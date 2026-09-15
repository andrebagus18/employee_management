import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import ActionMenu from "@/molecules/ActionMenu";
import { Badge } from "@/components/ui/badge";

function RoleTable({ roles }) {
  return (
    <div className="rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Users</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {roles.map((role, index) => (
              <TableRow key={role.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role._count?.user}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default RoleTable;
