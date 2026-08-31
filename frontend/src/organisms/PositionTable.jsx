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

function PositionTable({ positions }) {
  return (
    <div className="rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Position</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {positions.map((position) => (
              <TableRow key={position.id}>
                <TableCell>{position.name}</TableCell>
                <TableCell>{position.department}</TableCell>
                <TableCell>{position.employees}</TableCell>
                <TableCell>
                  <ActionMenu
                    actions={[
                      {
                        label: "View",
                        icon: Eye,
                        onClick: () => console.log("VIEW", position.id),
                      },
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => console.log("EDIT", position.id),
                      },
                      {
                        label: "Delete",
                        icon: Trash2,
                        variant: "destructive",
                        onClick: () => console.log("DELETE", position.id),
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

export default PositionTable;
