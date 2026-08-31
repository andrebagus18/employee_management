import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";

function PermissionForm({ onSubmit, onCancel }) {
  const handleSubmit = (event) => {
    event.preventDefault();
    const formData = new FormData(event.currentTarget);
    const data = {
      name: formData.get("name"),
      key: formData.get("key"),
      description: formData.get("description"),
      module: formData.get("module"),
      action: formData.get("action"),
      status: formData.get("status"),
    };
    onSubmit?.(data);
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Permission Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Permission Name</Label>
        <Input id="name" name="name" placeholder="e.g. View Employees" />
      </div>

      {/* Permission Key */}
      <div className="space-y-2">
        <Label htmlFor="key">Permission Key</Label>
        <Input id="key" name="key" placeholder="e.g. employees.view" />
        <p className="text-xs text-muted-foreground">
          Use a unique key to identify this permission.
        </p>
      </div>

      {/* Module & Action */}
      <div className="grid gap-4 sm:grid-cols-2">
        <div className="space-y-2">
          <Label htmlFor="module">Module</Label>
          <select
            id="module"
            name="module"
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Select module</option>
            <option value="employees">Employees</option>
            <option value="departments">Departments</option>
            <option value="positions">Positions</option>
            <option value="job-levels">Job Levels</option>
            <option value="leave-requests">Leave Requests</option>
            <option value="users">Users</option>
          </select>
        </div>

        <div className="space-y-2">
          <Label htmlFor="action">Action</Label>
          <select
            id="action"
            name="action"
            className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
          >
            <option value="">Select action</option>
            <option value="view">View</option>
            <option value="create">Create</option>
            <option value="update">Update</option>
            <option value="delete">Delete</option>
          </select>
        </div>
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          placeholder="Describe what this permission allows..."
          className="min-h-24 resize-none"
        />
      </div>

      {/* Status */}
      <div className="space-y-2">
        <Label htmlFor="status">Status</Label>

        <select
          id="status"
          name="status"
          defaultValue="active"
          className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
        >
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        <Button type="submit">Create Permission</Button>
      </div>
    </form>
  );
}

export default PermissionForm;
