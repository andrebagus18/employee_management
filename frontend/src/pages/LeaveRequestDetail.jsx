import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import { formatDateIndo } from "@/lib/utils";
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
        <Button onClick={() => navigate("/leave-requests")}>
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
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-xl font-semibold capitalize">
              {user?.employee?.name}
            </h2>
            <p className="text-sm text-muted-foreground">
              {formatDateIndo(leaveRequest.reviewedBy)}
            </p>
            <p className="text-sm text-muted-foreground">{leaveRequest.type}</p>
            <p className="text-sm text-muted-foreground">
              {leaveRequest.description}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDateIndo(leaveRequest.start_date)}
            </p>
            <p className="text-sm text-muted-foreground">
              {formatDateIndo(leaveRequest.end_date)}
            </p>
          </div>
          <Badge>{leaveRequest.status}</Badge>
          <p className="text-sm text-muted-foreground">
            {formatDateIndo(leaveRequest.reviewedAt)}
          </p>
        </CardContent>
      </Card>
    </div>
  );
}

export default LeaveRequestDetail;
