import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { CheckCircle, Eye, XCircleIcon, LoaderCircle } from "lucide-react";
import ActionMenu from "@/molecules/ActionMenu";
import { Badge } from "@/components/ui/badge";
import { formatDateIndo, getStatusVariant } from "../lib/utils";
import { useNavigate } from "react-router-dom";

function LeaveRequestTable({
  leaveRequests,
  actionLoading,
  handleApprove,
  handleReject,
}) {
  const navigate = useNavigate();
  const isLoading = actionLoading;

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
            {leaveRequests.map((leaveRequest, index) => {
              isLoading === leaveRequest.id;
              return (
                <TableRow key={leaveRequest.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">
                        {leaveRequest.employee?.name}
                      </p>
                      <p className="text-xs text-muted-foreground">
                        {leaveRequest.employee?.user?.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{leaveRequest.reviewedBy ?? "-"}</TableCell>
                  <TableCell>
                    {formatDateIndo(leaveRequest.start_date)}
                  </TableCell>
                  <TableCell>{formatDateIndo(leaveRequest.end_date)}</TableCell>
                  <TableCell>
                    {formatDateIndo(leaveRequest.reviewedAt)}
                  </TableCell>
                  <TableCell>{leaveRequest.type}</TableCell>
                  <TableCell>
                    <Badge variant={getStatusVariant(leaveRequest.status)}>
                      {leaveRequest.status}
                    </Badge>
                  </TableCell>
                  <TableCell>
                    {leaveRequest.status === "PENDING" ? (
                      <ActionMenu
                        actions={[
                          {
                            label: "View",
                            icon: Eye,
                            onClick: () =>
                              navigate(`/leave-requests/${leaveRequest.id}`),
                          },
                          {
                            label: "Approve",
                            icon: isLoading ? LoaderCircle : CheckCircle,
                            iconClassName: isLoading
                              ? "text-green-500 animate-spin"
                              : "text-green-500",
                            className: "text-green-500",
                            onClick: () => handleApprove(leaveRequest.id),
                          },
                          {
                            label: "Reject",
                            icon: isLoading ? LoaderCircle : XCircleIcon,
                            iconClassName: isLoading
                              ? "text-red-500 animate-spin"
                              : "text-red-500",
                            className: "text-red-500",
                            onClick: () => handleReject(leaveRequest.id),
                          },
                        ]}
                      />
                    ) : (
                      <ActionMenu
                        actions={[
                          {
                            label: "View",
                            icon: Eye,
                            onClick: () =>
                              navigate(`/leave-requests/${leaveRequest.id}`),
                          },
                        ]}
                      />
                    )}
                  </TableCell>
                </TableRow>
              );
            })}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default LeaveRequestTable;
