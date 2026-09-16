import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRoles } from "../hooks/useRoles";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function RolePermissionForm({ onSubmit, onCancel }) {
  const { id } = useParams();
  const { role, getPermissionId } = useRoles({ id });
  useEffect(() => {
    getPermissionId(id);
  }, [id]);
  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">Edit Role</h1>
        <p className="text-sm text-muted-foreground">
          Manage role information and permissions
        </p>
      </div>

      {/* Role information */}
      <div className="rounded-xl border p-6">
        <p className="font-normal text-muted-foreground">Role Name</p>
        <h2 className="text-xl font-semibold">{role[0]?.role?.name}</h2>
      </div>

      {/* Permissions */}
      <div className="rounded-xl border">
        <h2 className="py-4 px-6 font-normal text-muted-foreground">
          Permissions
        </h2>
        <div className="space-y-3">{/* permissions dari API */}</div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>

        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

export default RolePermissionForm;
