import PermissionFilters from "@/molecules/PermissionFilters";
import PermissionTable from "@/organisms/PermissionTable";
import PermissionForm from "@/molecules/PermissionForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { useState } from "react";

const permissions = [
  {
    id: 1,
    name: "View Employees",
    key: "employees.view",
    module: "Employees",
    action: "View",
    status: "Active",
  },
  {
    id: 2,
    name: "Create Employees",
    key: "employees.create",
    module: "Employees",
    action: "Create",
    status: "Active",
  },
  {
    id: 3,
    name: "Update Employees",
    key: "employees.update",
    module: "Employees",
    action: "Update",
    status: "Active",
  },
  {
    id: 4,
    name: "Delete Employees",
    key: "employees.delete",
    module: "Employees",
    action: "Delete",
    status: "Active",
  },
  {
    id: 5,
    name: "View Departments",
    key: "departments.view",
    module: "Departments",
    action: "View",
    status: "Active",
  },
  {
    id: 6,
    name: "Manage Leave Requests",
    key: "leave-requests.update",
    module: "Leave Requests",
    action: "Update",
    status: "Active",
  },
  {
    id: 7,
    name: "View Users",
    key: "users.view",
    module: "Users",
    action: "View",
    status: "Active",
  },
];

function Permissions() {
  const [open, setOpen] = useState(false);
  const handleCreate = (data) => {
    console.log("CREATE ROLE:", data);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Permissions</h1>

        <p className="text-sm text-muted-foreground">
          Manage system permissions and access capabilities.
        </p>
      </div>

      {/* Create Permission */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Permission</DialogTitle>

            <DialogDescription>
              Create a new permission for the organization.
            </DialogDescription>
          </DialogHeader>

          <PermissionForm onSubmit={handleCreate} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <PermissionFilters />
        <Button
          onClick={() => setOpen(true)}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Permission
        </Button>
      </div>

      {/* Table */}
      <PermissionTable permissions={permissions} />
    </div>
  );
}

export default Permissions;
