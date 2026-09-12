import { useEffect } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DailyReportFilters from "@/molecules/DailyReportFilters";
import DailyReportTable from "@/organisms/DailyReportTable";
import { useDailyReports } from "@/hooks/useDailyReports";
import { useNavigate } from "react-router-dom";

function DailyReports() {
  const { fetchDailyReports, reports, loading } = useDailyReports();
  const navigate = useNavigate();
  useEffect(() => {
    fetchDailyReports();
  }, [fetchDailyReports]);

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
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Daily Report</DialogTitle>

            <DialogDescription>
              Add a daily work report for the organization.
            </DialogDescription>
          </DialogHeader>

          <DailyReportForm />
        </DialogContent>
      </Dialog> */}

      {/* Filters */}
      <div className="flex justify-between items-center">
        <DailyReportFilters />
        <Button
          onClick={() => navigate("/daily-reports/create")}
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
