import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useEffect } from "react";

function PermissionForm({
  permissions,
  handleSubmit,
  onCancel,
  form,
  errors,
  setForm,
  handleChange,
  id,
  loading,
}) {
  console.log("permissions:", permissions);
  useEffect(() => {
    if (!id || permissions.length === 0) return;
    const permission = permissions.find(
      (permission) => permission.id === Number(id),
    );
    if (permission) {
      setForm({
        name: permission.name,
        description: permission.description,
      });
    }
  }, [id, permissions, setForm]);

  return (
    <form onSubmit={handleSubmit} className="space-y-5">
      {/* Permission Key */}
      <div className="space-y-2">
        <Label htmlFor="name">Permission Module</Label>
        <Input
          id="name"
          name="name"
          value={form.name}
          onChange={handleChange}
          placeholder="e.g. employees.view"
        />
        <p className="text-xs text-muted-foreground">
          Use a unique key to identify this permission.
        </p>
        {errors.name && (
          <p className="font-sm text-destructive">{errors.name}</p>
        )}
      </div>

      {/* Description */}
      <div className="space-y-2">
        <Label htmlFor="description">Description</Label>
        <Textarea
          id="description"
          name="description"
          value={form.description}
          onChange={handleChange}
          placeholder="Describe what this permission allows..."
          className="min-h-24 resize-none"
        />
        {errors.description && (
          <p className="font-sm text-destructive">{errors.description}</p>
        )}
      </div>

      {/* Actions */}
      <div className="flex justify-end gap-3 pt-2">
        <Button type="button" variant="outline" onClick={onCancel}>
          Cancel
        </Button>

        {id ? (
          <Button type="submit" className="cursor-pointer" disabled={loading}>
            {loading ? "Updated..." : "Update permission"}
          </Button>
        ) : (
          <Button type="submit" className="cursor-pointer" disabled={loading}>
            {loading ? "Created..." : "Created permission"}
          </Button>
        )}
      </div>
    </form>
  );
}

export default PermissionForm;
