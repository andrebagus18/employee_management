import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import {
  CheckCircle,
  Eye,
  XCircleIcon,
  LoaderCircle,
  SearchX,
  RotateCcw,
} from "lucide-react";
import ActionMenu from "@/molecules/ActionMenu";
import { Badge } from "@/components/ui/badge";
import { formatDateIndo, getStatusVariant } from "../lib/utils";
import { useNavigate } from "react-router-dom";

function LeaveRequestTable({
  leaveRequests,
  actionLoading,
  handleApprove,
  handleReject,
  pagination,
  onResetFilters,
}) {
  const navigate = useNavigate();
  const isLoading = actionLoading;
  console.log("leave", leaveRequests);
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
            {(leaveRequests ?? []).length > 0 ? (
              leaveRequests.map((leaveRequest, index) => {
                isLoading === leaveRequest.id;
                return (
                  <TableRow key={leaveRequest.id}>
                    <TableCell>
                      {(pagination.page - 1) * pagination.limit + index + 1}
                    </TableCell>
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
                    <TableCell>
                      {formatDateIndo(leaveRequest.end_date)}
                    </TableCell>
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
              })
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                      <SearchX className="size-10 text-muted-foreground animate-[bounce_1.5s_ease-in-out_infinite]" />
                    </div>
                    <div>
                      <p className="font-medium"> No positions found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={onResetFilters}
                      className="gap-2 border border-slate-400/50 cursor-pointer bg-slate-200 hover:bg-slate-400/30"
                    >
                      <RotateCcw className="sixe-4" />
                      Reset Filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default LeaveRequestTable;
