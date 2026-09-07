import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import FormSelect from "./FormSelect";
import { useDepartments } from "@/hooks/useDepartments";

function PositionForm({ onCancel, form, errors, handleChange, handleSubmit }) {
  const { departments } = useDepartments();

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
            value: department.id,
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
        <Button type="submit" className="cursor-pointer">
          Create Position
        </Button>
      </div>
    </form>
  );
}

export default PositionForm;
