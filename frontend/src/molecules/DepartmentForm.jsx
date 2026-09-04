import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

function DepartmentForm({
  handleSubmit,
  handleChange,
  form,
  setForm,
  errors,
  loading,
  selectDepartment,
  isEdit,
}) {
  useEffect(() => {
    if (selectDepartment) {
      setForm({
        name: selectDepartment.name,
      });
    }
  }, [selectDepartment?.id]);
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
            {isEdit ? (
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={loading}
              >
                {loading ? "Creating..." : "Create Department"}
              </Button>
            ) : (
              <Button
                type="submit"
                className="cursor-pointer"
                disabled={loading}
              >
                {loading ? "Update..." : "Update Department"}
              </Button>
            )}
          </div>
        </form>
      </div>
    </div>
  );
}

export default DepartmentForm;
