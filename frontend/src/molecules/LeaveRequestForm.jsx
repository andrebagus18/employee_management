import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function LeaveRequestForm({ onSubmit, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      employee: formData.get("employee"),
      leaveType: formData.get("leaveType"),
      startDate: formData.get("startDate"),
      endDate: formData.get("endDate"),
      reason: formData.get("reason"),
    };

    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Employee */}
      <div className="space-y-2">
        <Label htmlFor="employee">Employee</Label>
        <select
          id="employee"
          name="employee"
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          <option value="">Select employee</option>
          <option value="john-doe">John Doe</option>
          <option value="sarah-smith">Sarah Smith</option>
          <option value="michael-lee">Michael Lee</option>
        </select>
      </div>

      {/* Leave Type */}
      <div className="space-y-2">
        <Label htmlFor="leaveType">Leave Type</Label>
        <select
          id="leaveType"
          name="leaveType"
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
        >
          <option value="">Select leave type</option>
          <option value="annual">Annual Leave</option>
          <option value="sick">Sick Leave</option>
          <option value="personal">Personal Leave</option>
        </select>
      </div>

      {/* Dates */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="startDate">Start Date</Label>
          <Input id="startDate" name="startDate" type="date" />
        </div>
        <div className="space-y-2">
          <Label htmlFor="endDate">End Date</Label>
          <Input id="endDate" name="endDate" type="date" />
        </div>
      </div>
      {/* Reason */}
      <div className="space-y-2">
        <Label htmlFor="reason">Reason</Label>
        <Textarea
          id="reason"
          name="reason"
          placeholder="Explain the reason for this leave..."
          className="min-h-24 resize-none"
        />
      </div>
      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>
        <Button type="submit">Create Request</Button>
      </div>
    </form>
  );
}

export default LeaveRequestForm;
