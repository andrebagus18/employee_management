import { Button } from "@/components/ui/button";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import FormSelect from "./FormSelect";
import FormDate from "./FormDate";
import { useAuth } from "../context/authContext";

function LeaveRequestForm({
  handleChange,
  handleSubmit,
  form,
  errors,
  onCancel,
  leaveRequests,
}) {
  const { user } = useAuth();
  const LeaveTypes = [
    {
      value: "ANNUAL",
      label: "Annual Leave",
    },
    {
      value: "SICK",
      label: "Sick Leave",
    },
    {
      value: "PERSONAL",
      label: "Personal Leave",
    },
  ];

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="grid grid-cols-2 gap-4">
        {/* Employee */}
        <div className="space-y-3">
          <Label htmlFor="employee">Employee</Label>
          <p className="w-full font-medium text-lg bg-gray-300/30 py-1 px-2 rounded-md text-gray-500">
            {user?.employee?.name}
          </p>
        </div>

        {/* Leave Type */}
        <div className="space-y-2">
          <Label htmlFor="type">Leave Type</Label>
          <FormSelect
            name="type"
            value={form.type}
            onChange={handleChange}
            options={LeaveTypes}
            placeholder="Select Type"
            error={errors.type}
          />
        </div>

        {/* Dates */}
        <FormDate
          label="Start Date"
          name="start_date"
          value={form.start_date}
          onChange={handleChange}
          error={errors.start_date}
        />
        <FormDate
          label="End Date"
          name="end_date"
          value={form.end_date}
          onChange={handleChange}
          error={errors.end_date}
        />
      </div>

      {/* Reason */}
      <div className="space-y-2">
        <Label htmlFor="reason">Reason</Label>
        <Textarea
          id="reason"
          name="reason"
          onChange={handleChange}
          placeholder="Explain the reason for this leave..."
          className="min-h-24 resize-none"
        />
        {errors.description && (
          <p className="font-sm text-destructive">{errors.description}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          className="cursor-pointer"
          type="button"
          variant="outline"
          onClick={onCancel}
        >
          Cancel
        </Button>
        <Button className="cursor-pointer" type="submit">
          Create Request
        </Button>
      </div>
    </form>
  );
}

export default LeaveRequestForm;
