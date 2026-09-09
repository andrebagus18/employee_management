import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSelect from "./FormSelect";
import { useDepartments } from "@/hooks/useDepartments";
import { useEffect } from "react";

function PositionForm({
  onCancel,
  loading,
  form,
  setForm,
  errors,
  handleChange,
  handleSubmit,
  id,
  positions,
}) {
  const { departments } = useDepartments();
  useEffect(() => {
    if (!id || positions.length === 0) return;
    const position = positions.find((position) => position.id === Number(id));
    if (position) {
      setForm({
        name: position.name,
        departmentId: String(position.department.id),
      });
    }
  }, [id, positions, setForm]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Position Name */}
      <div className="space-y-2">
        <Label htmlFor="name">Position Name</Label>
        <Input
          id="name"
          name="name"
          type="text"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Frontend Developer"
          className="border border-slate-400/50"
        />
        {errors.name && (
          <p className="font-sm text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Department */}
      <div className="space-y-2">
        <FormSelect
          label="Department"
          name="departmentId"
          value={form.departmentId}
          onChange={handleChange}
          options={departments.map((department) => ({
            value: String(department.id),
            label: department.name,
          }))}
          placehorder="Select Department"
          error={errors.departmentId}
        />
      </div>
      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={onCancel}
        >
          Cancel
        </Button>
        {id ? (
          <Button type="submit" className="cursor-pointer" disabled={loading}>
            {loading ? "Update..." : "Update Position"}
          </Button>
        ) : (
          <Button type="submit" className="cursor-pointer" disabled={loading}>
            {loading ? "Creating..." : "Create Position"}
          </Button>
        )}
      </div>
    </form>
  );
}

export default PositionForm;
