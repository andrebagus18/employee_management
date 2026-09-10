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
import { formatDateIndo, getStatusVariant } from "../lib/utils";
import { useNavigate } from "react-router-dom";

function LeaveRequestTable({ leaveRequests }) {
  const navigate = useNavigate();

  return (
    <div className="rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Reviewed By</TableHead>
              <TableHead>Start Date</TableHead>
              <TableHead>End Date</TableHead>
              <TableHead>Review Date</TableHead>
              <TableHead>Type</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {leaveRequests.map((leaveRequest, index) => (
              <TableRow key={leaveRequest.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>
                  <div>
                    <p className="font-medium">{leaveRequest.employee?.name}</p>
                    <p className="text-xs text-muted-foreground">
                      {leaveRequest.employee?.user?.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{leaveRequest.reviewedBy ?? "-"}</TableCell>
                <TableCell>{formatDateIndo(leaveRequest.start_date)}</TableCell>
                <TableCell>{formatDateIndo(leaveRequest.end_date)}</TableCell>
                <TableCell>{formatDateIndo(leaveRequest.reviewedAt)}</TableCell>
                <TableCell>{leaveRequest.type}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(leaveRequest.status)}>
                    {leaveRequest.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ActionMenu
                    actions={[
                      {
                        label: "View",
                        icon: Eye,
                        onClick: () =>
                          navigate(`/leave-requests/${leaveRequest.id}`),
                      },
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () =>
                          navigate(`/leave-requests/${leaveRequest.id}/update`),
                      },
                      {
                        label: "Delete",
                        icon: Trash2,
                        variant: "destructive",
                        onClick: () => console.log("DELETE", request.id),
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

export default LeaveRequestTable;
