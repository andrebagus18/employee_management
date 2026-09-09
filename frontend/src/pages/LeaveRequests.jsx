import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import LeaveRequestFilters from "@/molecules/LeaveRequestFilters";
import LeaveRequestForm from "@/molecules/LeaveRequestForm";
import LeaveRequestTable from "@/organisms/LeaveRequestTable";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { useEffect } from "react";

function LeaveRequests() {
  const { leaveRequests, fetchLeaveRequests, loading, errors, open, setOpen } =
    useLeaveRequests();
  useEffect(() => {
    fetchLeaveRequests();
  }, [fetchLeaveRequests]);

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Leave Requests
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage employee leave requests.
          </p>
        </div>
      </div>

      {/* Create Request Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Leave Request</DialogTitle>

            <DialogDescription>
              Create a leave request to employee.
            </DialogDescription>
          </DialogHeader>
          {/* onSubmit={handleCreate} onCancel={handleCancel} */}
          <LeaveRequestForm />
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <LeaveRequestFilters />
        <Button
          onClick={() => setOpen(true)}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Leave Request
        </Button>
      </div>

      {/* Table */}
      <LeaveRequestTable leaveRequests={leaveRequests} />
    </div>
  );
}

export default LeaveRequests;
