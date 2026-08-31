import { useState } from "react";
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

const requests = [
  {
    id: 1,
    employee: "John Doe",
    email: "john@company.com",
    leaveType: "Annual Leave",
    startDate: "Sep 02, 2026",
    endDate: "Sep 04, 2026",
    duration: 3,
    status: "Pending",
  },
  {
    id: 2,
    employee: "Sarah Smith",
    email: "sarah@company.com",
    leaveType: "Sick Leave",
    startDate: "Sep 01, 2026",
    endDate: "Sep 01, 2026",
    duration: 1,
    status: "Approved",
  },
  {
    id: 3,
    employee: "Michael Lee",
    email: "michael@company.com",
    leaveType: "Annual Leave",
    startDate: "Sep 08, 2026",
    endDate: "Sep 10, 2026",
    duration: 3,
    status: "Rejected",
  },
  {
    id: 4,
    employee: "Emily Johnson",
    email: "emily@company.com",
    leaveType: "Personal Leave",
    startDate: "Sep 12, 2026",
    endDate: "Sep 12, 2026",
    duration: 1,
    status: "Pending",
  },
];

function LeaveRequests() {
  const [open, setOpen] = useState(false);

  const handleCreate = (data) => {
    console.log("CREATE LEAVE REQUEST:", data);

    setOpen(false);
  };

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

          <LeaveRequestForm onSubmit={handleCreate} onCancel={handleCancel} />
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
      <LeaveRequestTable requests={requests} />
    </div>
  );
}

export default LeaveRequests;
