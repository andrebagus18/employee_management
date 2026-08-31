import { useState } from "react";
import { CirclePlus, Plus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
} from "@/components/ui/dialog";

import DepartmentFilters from "@/molecules/DepartmentFilters";
import DepartmentForm from "@/molecules/DepartmentForm";
import DepartmentTable from "@/organisms/DepartmentTable";

const departments = [
  {
    id: 1,
    name: "Engineering",
    description: "Software & IT department",
    employees: 32,
  },
  {
    id: 2,
    name: "Human Resources",
    description: "People & Culture",
    employees: 12,
  },
  {
    id: 3,
    name: "Finance",
    description: "Financial Operations",
    employees: 8,
  },
  {
    id: 4,
    name: "Marketing",
    description: "Marketing Team",
    employees: 15,
  },
];

function Departments() {
  const [open, setOpen] = useState(false);

  const handleCreate = (data) => {
    console.log("CREATE DEPARTMENT:", data);

    setOpen(false);
  };

  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Departments</h1>

          <p className="text-sm text-muted-foreground">
            Manage your organization's departments.
          </p>
        </div>

        {/* Create Department */}
        <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Create Department</DialogTitle>

              <DialogDescription>
                Add a new department to organization.
              </DialogDescription>
            </DialogHeader>

            <DepartmentForm onSubmit={handleCreate} onCancel={handleCancel} />
          </DialogContent>
        </Dialog>
      </div>

      {/* Filters */}
      <div className="w-full flex justify-between items-center">
        <DepartmentFilters />
        <Button
          className="max-w-3xs w-full flex gap-4 py-5 text-md cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <CirclePlus className="size-5" />
          Add Department
        </Button>
      </div>

      {/* Table */}
      <DepartmentTable departments={departments} />
    </div>
  );
}

export default Departments;
