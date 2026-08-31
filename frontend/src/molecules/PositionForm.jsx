import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function PositionForm({ onSubmit, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      department: formData.get("department"),
      jobLevel: formData.get("jobLevel"),
      description: formData.get("description"),
    };

    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Position Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Position Name</Label>

        <Input id="name" name="name" placeholder="e.g. Frontend Developer" />
      </div>

      {/* Department */}
      <div className="space-y-2">
        <Label htmlFor="department">Department</Label>

        <select
          id="department"
          name="department"
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">Select department</option>
          <option value="engineering">Engineering</option>
          <option value="human-resources">Human Resources</option>
          <option value="finance">Finance</option>
          <option value="marketing">Marketing</option>
        </select>
      </div>

      {/* Job Level */}
      <div className="space-y-2">
        <Label htmlFor="jobLevel">Job Level</Label>

        <select
          id="jobLevel"
          name="jobLevel"
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="">Select job level</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>

        <Textarea
          id="description"
          name="description"
          placeholder="Describe this position..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">Create Position</Button>
      </div>
    </form>
  );
}

export default PositionForm;
