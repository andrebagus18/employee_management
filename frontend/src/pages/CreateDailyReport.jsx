import DailyReportForm from "@/molecules/DailyReportForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { useDailyReports } from "@/hooks/useDailyReports";

function CreateDailyReport() {
  const { handleChange, handleSubmit, form, errors } = useDailyReports();
  const navigate = useNavigate();
  return (
    <div className="mx-auto w-full space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            type="button"
            variant="ghost"
            className="mb-2 -ml-3 cursor-pointer"
            onClick={() => navigate("/leave-requests")}
          >
            <ArrowLeft />
            Back to Daily Reports
          </Button>

          <h1 className="text-2xl font-semibold tracking-tight">
            Create Daily Report.
          </h1>

          <p className="text-sm text-muted-foreground">Create a new report.</p>
        </div>
      </div>
      <DailyReportForm
        form={form}
        errors={errors}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
      />
    </div>
  );
}

export default CreateDailyReport;
