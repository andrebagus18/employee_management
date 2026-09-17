import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { useRoles } from "../hooks/useRoles";
import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePermissions } from "../hooks/usePermissions";
import { Circle, CircleCheck } from "lucide-react";

function RolePermissionForm() {
  const { id } = useParams();
  const { rolePermission, getPermissionId } = useRoles({ id });
  const { permissions } = usePermissions();
  const [selectPermission, setSelectPermission] = useState([]);
  useEffect(() => {
    getPermissionId(id);
  }, [id]);
  useEffect(() => {
    setSelectPermission(rolePermission.map((item) => item.permissionId));
  }, [rolePermission]);
  const handleToggle = (permissionId) => {
    setSelectPermission((prev) =>
      prev.includes(permissionId)
        ? prev.filter((id) => id !== permissionId)
        : [...prev, permissionId],
    );
  };
  console.log("rolePer:", rolePermission);
  console.log("perm:", permissions);

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
        <h2 className="text-xl font-semibold">
          {rolePermission[0]?.role?.name}
        </h2>
      </div>

      {/* Permissions */}
      <div className="rounded-xl border">
        <h2 className="py-4 px-6 font-normal text-muted-foreground">
          Permissions
        </h2>
        <div className="grid grid-cols-3 gap-3">
          {/* permissions dari API */}
          {permissions.map((permission) => {
            const checked = selectPermission.includes(permission.id);
            return (
              <Button
                key={permission.id}
                type="button"
                onClick={() => handleToggle(permission.id)}
                className="flex w-full items-center gap-3 rounded-lg px-3 py-2 text-left transition hover:bg-muted hover:text-black"
              >
                {checked ? (
                  <CircleCheck className="size-5" />
                ) : (
                  <Circle className="size-5" />
                )}
                <span>{permission.name}</span>
              </Button>
            );
          })}
        </div>
      </div>

      <div className="flex justify-end gap-2">
        <Button variant="outline">Cancel</Button>

        <Button>Save Changes</Button>
      </div>
    </div>
  );
}

export default RolePermissionForm;
