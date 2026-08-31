import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2, ShieldCheck } from "lucide-react";
import ActionMenu from "@/molecules/ActionMenu";
import { Badge } from "@/components/ui/badge";

function RoleTable({ roles }) {
  const getStatusVariant = (status) => {
    if (status === "Active") return "default";
    if (status === "Inactive") return "destructive";
    return "secondary";
  };

  return (
    <div className="rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Role</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Users</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {roles.map((role) => (
              <TableRow key={role.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{role.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {role.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{role.description}</TableCell>
                <TableCell>{role.users}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(role.status)}>
                    {role.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ActionMenu
                    actions={[
                      {
                        label: "View",
                        icon: Eye,
                        onClick: () => console.log("VIEW", role.id),
                      },
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => console.log("EDIT", role.id),
                      },
                      {
                        label: "Delete",
                        icon: Trash2,
                        variant: "destructive",
                        onClick: () => console.log("DELETE", role.id),
                      },
                    ]}
                  />
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
