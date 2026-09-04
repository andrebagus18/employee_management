import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function DepartmentForm({ onSubmit }) {
  const handleSubmit = (event) => {
    event.preventDefault();

    const formData = new FormData(event.currentTarget);

    const data = {
      name: formData.get("name"),
      description: formData.get("description"),
    };

    onSubmit?.(data);
  };

  return (
    <div className="space-y-5 border border-slate-400/30 rounded-xl p-4">
      <div className="flex flex-col gap-4">
        <div className="flex flex-col">
          <h1 className="text-2xl font-medium">Create Department</h1>
          <p className="text-sm text-muted-foreground">
            Add a new department to organization.
          </p>
        </div>
        <form onSubmit={handleSubmit}>
          <div className="space-y-3">
            <Label htmlFor="name">Department Name</Label>
            <Input id="name" name="name" placeholder="e.g. Engineering" />
          </div>
          <div className="flex justify-end mt-4 ">
            <Button type="submit" className="cursor-pointer">
              Create Department
            </Button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentForm;
