import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Eye, Pencil, ShieldCheck } from "lucide-react";
import { useNavigate } from "react-router-dom";

function RoleTable({ roles }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table className="p-8">
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Permissions</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {roles.map((role, index) => (
              <TableRow key={role.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{role.name}</TableCell>
                <TableCell>{role._count?.user ?? 0}</TableCell>
                <TableCell>
                  <div className="flex items-center gap-2">
                    <ShieldCheck className="size-4 text-muted-foreground" />
                    {role._count?.rolepermission ?? 0}
                  </div>
                </TableCell>
                <TableCell className="flex gap-2">
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    // onClick={() => onEdit(position.id)}
                  >
                    <Eye />
                  </Button>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => navigate(`/roles/${role.id}/update`)}
                  >
                    <Pencil />
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default RoleTable;
