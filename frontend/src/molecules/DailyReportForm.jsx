import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function DailyReportForm({ onSubmit, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      employee: formData.get("employee"),
      date: formData.get("date"),
      hours: formData.get("hours"),
      summary: formData.get("summary"),
      challenges: formData.get("challenges"),
      nextPlan: formData.get("nextPlan"),
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
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">Select employee</option>

          <option value="john-doe">John Doe</option>

          <option value="sarah-smith">Sarah Smith</option>

          <option value="michael-lee">Michael Lee</option>
        </select>
      </div>

      {/* Date & Hours */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="date">Report Date</Label>

          <Input id="date" name="date" type="date" />
        </div>

        <div className="space-y-2">
          <Label htmlFor="hours">Working Hours</Label>

          <Input
            id="hours"
            name="hours"
            type="number"
            min="0"
            max="24"
            step="0.5"
            placeholder="8"
          />
        </div>
      </div>

      {/* Summary */}
      <div className="space-y-2">
        <Label htmlFor="summary">Work Summary</Label>

        <Textarea
          id="summary"
          name="summary"
          placeholder="Describe the work completed today..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* Challenges */}
      <div className="space-y-2">
        <Label htmlFor="challenges">Challenges</Label>

        <Textarea
          id="challenges"
          name="challenges"
          placeholder="Describe any challenges or blockers..."
          className="min-h-20 resize-none"
        />
      </div>

      {/* Next Plan */}
      <div className="space-y-2">
        <Label htmlFor="nextPlan">Next Plan</Label>

        <Textarea
          id="nextPlan"
          name="nextPlan"
          placeholder="What do you plan to work on next?"
          className="min-h-20 resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">Create Report</Button>
      </div>
    </form>
  );
}

export default DailyReportForm;
