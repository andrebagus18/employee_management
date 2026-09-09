import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { useEffect } from "react";

function JobLevelForm({
  jobLevels,
  handleSubmit,
  handleChange,
  onCancel,
  errors,
  form,
  setForm,
  loading,
  id,
}) {
  useEffect(() => {
    if (!id || jobLevels === 0) return;
    const jobLevel = jobLevels.find((joblevel) => joblevel.id === Number(id));
    if (jobLevel) {
      setForm({
        name: jobLevel.name,
      });
    }
  }, [id, jobLevels, setForm]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      <div className="space-y-2">
        <Label htmlFor="name">Job Level Name</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. Senior"
        />
        {errors.name && (
          <p className="font-sm text-destructive">{errors.name}</p>
        )}
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <Button
          type="button"
          variant="outline"
          onClick={onCancel}
          className="cursor-pointer"
        >
          Cancel
        </Button>
        {id ? (
          <Button type="submit" className="cursor-pointer" disabled={loading}>
            {loading ? "Update..." : "Update Job Level"}
          </Button>
        ) : (
          <Button type="submit" className="cursor-pointer" disabled={loading}>
            {loading ? "Creating..." : "Create Job Level"}
          </Button>
        )}
      </div>
    </form>
  );
}

export default JobLevelForm;
