import DailyReportForm from "@/molecules/DailyReportForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate, useParams } from "react-router-dom";
import { useDailyReports } from "@/hooks/useDailyReports";

function CreateDailyReport() {
  const { id } = useParams();
  const { handleChange, reports, handleSubmit, form, setForm, errors } =
    useDailyReports({ id });
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
            onClick={() => navigate("/daily-reports")}
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
        setForm={setForm}
        errors={errors}
        reports={reports}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        id={id}
      />
    </div>
  );
}

export default CreateDailyReport;
