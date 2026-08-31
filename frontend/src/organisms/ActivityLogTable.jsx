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

function ActivityLogTable({ activities }) {
  return (
    <div className="rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>User</TableHead>
              <TableHead>Action</TableHead>
              <TableHead>Module</TableHead>
              <TableHead>Description</TableHead>
              <TableHead>Date</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {activities.map((activity) => (
              <TableRow key={activity.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{activity.user}</p>
                    <p className="text-xs text-muted-foreground">
                      {activity.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{activity.action}</TableCell>
                <TableCell>{activity.module}</TableCell>
                <TableCell>{activity.description}</TableCell>
                <TableCell>{activity.date}</TableCell>
                <TableCell>
                  <ActionMenu
                    actions={[
                      {
                        label: "View",
                        icon: Eye,
                        onClick: () => console.log("VIEW", activity.id),
                      },
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => console.log("EDIT", activity.id),
                      },
                      {
                        label: "Delete",
                        icon: Trash2,
                        variant: "destructive",
                        onClick: () => console.log("DELETE", activity.id),
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

export default ActivityLogTable;
