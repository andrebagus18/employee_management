import { useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import RoleFilters from "@/molecules/RoleFilters";
import RoleForm from "@/molecules/RoleForm";
import RoleTable from "@/organisms/RoleTable";

const roles = [
  {
    id: 1,
    name: "Admin",
    description: "Full system access",
    users: 2,
    status: "Active",
  },
  {
    id: 2,
    name: "HR",
    description: "Manage employees and HR operations",
    users: 4,
    status: "Active",
  },
  {
    id: 3,
    name: "Manager",
    description: "Manage team members and approvals",
    users: 8,
    status: "Active",
  },
  {
    id: 4,
    name: "Employee",
    description: "Standard employee access",
    users: 114,
    status: "Active",
  },
];

function Roles() {
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
      <div className="flex items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Roles</h1>

          <p className="text-sm text-muted-foreground">
            Manage roles and access levels.
          </p>
        </div>
      </div>

      {/* Create Role */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Role</DialogTitle>

            <DialogDescription>
              Create a new role for the organization.
            </DialogDescription>
          </DialogHeader>

          <RoleForm onSubmit={handleCreate} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <RoleFilters />
        <Button
          onClick={() => setOpen(true)}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Role
        </Button>
      </div>

      {/* Table */}
      <RoleTable roles={roles} />
    </div>
  );
}

export default Roles;
