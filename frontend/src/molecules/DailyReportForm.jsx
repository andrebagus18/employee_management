import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useAuth } from "../context/authContext";

function DailyReportForm() {
  const { user } = useAuth();

  return (
    <form className="space-y-5">
      {/* Employee */}
      <div className="space-y-2">
        <Label htmlFor="employee">Employee</Label>
        <p className="w-full font-medium text-lg bg-gray-300/30 py-1 px-2 rounded-md text-gray-500">
          {user?.employee?.name}
        </p>
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
        <Label htmlFor="summary">Description</Label>
        <Textarea
          id="summary"
          name="summary"
          placeholder="Describe the work completed today..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline">
          Cancel
        </Button>
        <Button type="submit">Create Report</Button>
      </div>
    </form>
  );
}

export default DailyReportForm;
