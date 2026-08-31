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

function PermissionTable({ permissions }) {
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
              <TableHead>Permission</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {permissions.map((permission) => (
              <TableRow key={permission.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{permission.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {permission.key}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{permission.module}</TableCell>
                <TableCell>{permission.action}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(permission.status)}>
                    {permission.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ActionMenu
                    actions={[
                      {
                        label: "View",
                        icon: Eye,
                        onClick: () => console.log("VIEW", permission.id),
                      },
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => console.log("EDIT", permission.id),
                      },
                      {
                        label: "Delete",
                        icon: Trash2,
                        variant: "destructive",
                        onClick: () => console.log("DELETE", permission.id),
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

export default PermissionTable;
