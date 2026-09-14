import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "@/context/authContext";
import FormDate from "./FormDate";
import TimePicker from "./TimePicker";
import { Input } from "@/components/ui/input";
import { CalculateTime } from "@/lib/utils";
import { useNavigate } from "react-router-dom";
import { useEffect } from "react";

function DailyReportForm({
  handleChange,
  handleSubmit,
  errors,
  form,
  setForm,
  id,
  reports,
}) {
  const { user } = useAuth();
  const navigate = useNavigate();
  useEffect(() => {
    if (!id || reports.length === 0) return;
    const report = reports.find((report) => report.id === Number(id));
    if (report) {
      setForm({
        report_date: report.report_date,
        start_time: report.start_time,
        end_time: report.end_time,
        report: report.report,
      });
    }
  }, [id, reports, setForm]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Employee */}
      <div className="grid sm:grid-cols-2 gap-4">
        <div className="space-y-2">
          <div className="space-y-2">
            <Label htmlFor="employee">Employee</Label>
            <p className="w-full font-medium text-lg bg-gray-300/20 py-1 px-2 rounded-md text-gray-500">
              {user?.employee?.name}
            </p>
          </div>
          {/* Date*/}
          <div className="space-y-2">
            <FormDate
              label="Date"
              name="report_date"
              value={form.report_date}
              onChange={handleChange}
              error={errors.report_date}
            />
          </div>
          {/* Hours */}
          <div className="space-y-2">
            <TimePicker
              label="Start Time"
              name="start_time"
              type="time"
              value={form.start_time}
              onChange={handleChange}
              error={errors.start_time}
            />
          </div>
          <div className="space-y-2">
            <TimePicker
              label="End Time"
              name="end_time"
              type="time"
              value={form.end_time}
              onChange={handleChange}
              error={errors.end_time}
            />
          </div>
          <div className="space-y-2">
            <Label>Total Hours</Label>
            <Input
              value={CalculateTime(form.start_time, form.end_time)}
              readOnly
            />
          </div>
        </div>

        <div>
          {/* Summary */}
          <div className="space-y-2">
            <Label htmlFor="report">Description</Label>
            <Textarea
              id="report"
              name="report"
              value={form.report}
              onChange={handleChange}
              error={errors.report}
              placeholder="Describe the work completed today..."
              className="min-h-60 resize-none"
            />
          </div>
          {/* Actions */}
          <div className="flex justify-end gap-3 pt-3">
            <Button
              type="button"
              onClick={() => navigate("/daily-reports")}
              variant="outline"
              className="cursor-pointer"
            >
              Cancel
            </Button>
            <Button type="submit" className="cursor-pointer">
              {id ? "Update report" : "Create Report"}
            </Button>
          </div>
        </div>
      </div>
    </form>
  );
}

export default DailyReportForm;
