import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateIndo, getStatusVariant } from "@/lib/utils";
import { useLeaveRequests } from "../hooks/useLeaveRequests";
import { useAuth } from "../context/authContext";

function LeaveRequestDetail() {
  const navigate = useNavigate();
  const { id } = useParams();
  const { user } = useAuth();
  const { getLeaveId, leaveRequest, loading } = useLeaveRequests();
  useEffect(() => {
    getLeaveId(id);
  }, [id]);
  // useEffect(() => {
  //   console.log("url id", id);
  //   console.log("employee detail", employee);
  // }, [employee, id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!leaveRequest) {
    return (
      <div className="space-y-2">
        <p className="text-md text-destructive">Not found</p>
        <Button
          onClick={() => navigate("/leave-requests")}
          className="cursor-pointer px-2 py-1"
        >
          Back to Leave Requests
        </Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/leave-requests")}
          className="cursor-pointer"
        >
          <ArrowLeft />
        </Button>
        <div>
          <h1 className="text-2xl font-semibold">Leave Request Detail</h1>
          <p className="text-sm text-muted-foreground">
            View Leave request information
          </p>
        </div>
      </div>

      <Card>
        <CardContent className="flex items-center justify-between p-6 px-10">
          <div className="flex flex-col gap-4">
            <div className="w-full text-xl">
              <h2 className="text-xl font-semibold capitalize">
                {user?.employee?.name}
              </h2>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-md text-muted-foreground">Leave Type</span>
              <p className="text-lg text-black font-medium">
                {leaveRequest.type}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-md text-muted-foreground">Reason</span>
              <p className="text-lg text-black font-medium">
                {leaveRequest.description}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-md text-muted-foreground">Start Date</span>
              <p className="text-lg text-black font-medium">
                {formatDateIndo(leaveRequest.start_date)}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-md text-muted-foreground">End Date</span>
              <p className="text-lg text-black font-medium">
                {formatDateIndo(leaveRequest.end_date)}
              </p>
            </div>
          </div>
          <div className="flex flex-col gap-4 mr-10">
            <Badge
              className="px-10 py-4 text-md"
              variant={getStatusVariant(leaveRequest.status)}
            >
              {leaveRequest.status}
            </Badge>
            <div className="flex flex-col gap-1">
              <span className="text-md text-muted-foreground">Reviewed By</span>
              <p className="text-lg text-black font-medium uppercase">
                {leaveRequest.user_leaverequest_approverIdTouser?.employee.name}
              </p>
            </div>
            <div className="flex flex-col gap-1">
              <span className="text-md text-muted-foreground">Reviewed At</span>
              <p className="text-lg text-black font-medium">
                {formatDateIndo(leaveRequest.reviewedAt)}
              </p>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}

export default LeaveRequestDetail;
