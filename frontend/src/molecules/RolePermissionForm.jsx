import { Button } from "@/components/ui/button";
import { useRoles } from "../hooks/useRoles";
import { useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { usePermissions } from "../hooks/usePermissions";
import { Circle, CircleCheckBig, ArrowLeft } from "lucide-react";
import { showError, showSuccess } from "../lib/alert";

function RolePermissionForm() {
  const { id } = useParams();
  const navigate = useNavigate();
  const { rolePermission, getPermissionId, assigned, revoked } = useRoles({
    id,
  });
  const { permissions } = usePermissions();
  const [selectPermission, setSelectPermission] = useState([]);
  useEffect(() => {
    getPermissionId(id);
  }, [id]);
  useEffect(() => {
    setSelectPermission(rolePermission.map((item) => item.permissionId));
  }, [rolePermission]);
  const handleToggle = async (permissionId) => {
    try {
      let response;
      if (selectPermission.includes(permissionId)) {
        response = await revoked(id, permissionId);
        setSelectPermission((prev) => prev.filter((id) => id !== permissionId));
        showSuccess(response.msg);
      } else {
        response = await assigned(id, permissionId);
        setSelectPermission((prev) => [...prev, permissionId]);
        showSuccess(response.msg);
      }
    } catch (error) {
      console.error(error);
      showError(error.response?.data?.msg || "Something went wrong");
    }
  };

  return (
    <div className="space-y-4">
      <div>
        <h1 className="text-2xl font-semibold">
          <Button
            type="button"
            variant="ghost"
            className="cursor-pointer"
            onClick={() => navigate("/roles")}
          >
            <ArrowLeft />
          </Button>
          Edit Role
        </h1>
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
      <form>
        <div className="rounded-xl border">
          <h2 className="py-4 px-6 font-normal text-muted-foreground">
            Permissions
          </h2>

          <div className="grid grid-cols-3 gap-2 p-4 pt-0">
            {/* permissions dari API */}
            {permissions.map((permission) => {
              const checked = selectPermission.includes(permission.id);
              return (
                <Button
                  key={permission.id}
                  type="button"
                  variant="outline"
                  onClick={() => handleToggle(permission.id)}
                  className="flex w-full items-center justify-start gap-3 rounded-lg px-3 py-2 transition cursor-pointer hover:bg-muted hover:text-black"
                >
                  {checked ? (
                    <CircleCheckBig className="size-5 text-green-500" />
                  ) : (
                    <Circle className="size-5 text-red-500" />
                  )}
                  <span>{permission.name}</span>
                </Button>
              );
            })}
          </div>
        </div>
      </form>
    </div>
  );
}

export default RolePermissionForm;
