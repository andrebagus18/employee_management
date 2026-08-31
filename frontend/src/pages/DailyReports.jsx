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
import DailyReportFilters from "@/molecules/DailyReportFilters";
import DailyReportForm from "@/molecules/DailyReportForm";
import DailyReportTable from "@/organisms/DailyReportTable";

const reports = [
  {
    id: 1,
    employee: "John Doe",
    email: "john@company.com",
    date: "Aug 31, 2026",
    summary: "Completed employee dashboard and fixed authentication flow.",
    hours: 8,
    status: "Submitted",
  },
  {
    id: 2,
    employee: "Sarah Smith",
    email: "sarah@company.com",
    date: "Aug 31, 2026",
    summary: "Reviewed employee leave requests and updated HR records.",
    hours: 7.5,
    status: "Reviewed",
  },
  {
    id: 3,
    employee: "Michael Lee",
    email: "michael@company.com",
    date: "Aug 30, 2026",
    summary: "Worked on API integration and database optimization.",
    hours: 8,
    status: "Submitted",
  },
  {
    id: 4,
    employee: "Emily Johnson",
    email: "emily@company.com",
    date: "Aug 30, 2026",
    summary: "Prepared monthly financial reports.",
    hours: 6,
    status: "Draft",
  },
];

function DailyReports() {
  const [open, setOpen] = useState(false);
  const handleCreate = (data) => {
    console.log("CREATE DAILY REPORT:", data);
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
            Daily Reports
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor employee daily work reports.
          </p>
        </div>
      </div>

      {/* Create Report */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Daily Report</DialogTitle>

            <DialogDescription>
              Add a daily work report for the organization.
            </DialogDescription>
          </DialogHeader>

          <DailyReportForm onSubmit={handleCreate} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <DailyReportFilters />
        <Button
          onClick={() => setOpen(true)}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Daily Report
        </Button>
      </div>

      {/* Table */}
      <DailyReportTable reports={reports} />
    </div>
  );
}

export default DailyReports;
