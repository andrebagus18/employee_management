import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { RotateCcw } from "lucide-react";
import { useEffect } from "react";

function DepartmentForm({
  departments,
  handleSubmit,
  handleChange,
  form,
  setForm,
  errors,
  loading,
  onResetForm,
  mode,
  id,
}) {
  const selectDepartment = departments.find(
    (department) => department.id === Number(id),
  );
  useEffect(() => {
    if (mode === "edit" && selectDepartment) {
      setForm({
        name: selectDepartment.name,
      });
    }
    if (mode === "create") {
      setForm({ name: "" });
    }
  }, [mode, selectDepartment, setForm]);
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
            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="e.g. Engineering"
            />
            {errors.name && (
              <p className="font-sm text-destructive">{errors.name}</p>
            )}
          </div>
          <div className="flex justify-end mt-4 ">
            {mode === "edit" ? (
              <div className="flex gap-1">
                <Button
                  variant="outline"
                  onClick={onResetForm}
                  className="cursor-pointer"
                >
                  <RotateCcw className="sixe-4" />
                </Button>
                <Button
                  type="submit"
                  className="cursor-pointer"
                  disabled={loading}
                >
                  {loading ? "Update..." : "Update Department"}
                </Button>
              </div>
            ) : (
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Department"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentForm;
