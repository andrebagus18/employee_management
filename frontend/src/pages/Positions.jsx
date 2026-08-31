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

import PositionFilters from "@/molecules/PositionFilters";
import PositionForm from "@/molecules/PositionForm";
import PositionTable from "@/organisms/PositionTable";

const positions = [
  {
    id: 1,
    name: "Frontend Developer",
    department: "Engineering",
    jobLevel: "Senior",
    employees: 8,
  },
  {
    id: 2,
    name: "Backend Developer",
    department: "Engineering",
    jobLevel: "Mid",
    employees: 6,
  },
  {
    id: 3,
    name: "HR Specialist",
    department: "Human Resources",
    jobLevel: "Mid",
    employees: 5,
  },
  {
    id: 4,
    name: "Accountant",
    department: "Finance",
    jobLevel: "Junior",
    employees: 4,
  },
];

function Positions() {
  const [open, setOpen] = useState(false);

  const handleCreate = (data) => {
    console.log("CREATE POSITION:", data);

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
          <h1 className="text-2xl font-semibold tracking-tight">Positions</h1>

          <p className="text-sm text-muted-foreground">
            Manage positions in organization.
          </p>
        </div>
      </div>

      {/* Create Position Dialog */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Position</DialogTitle>

            <DialogDescription>
              Add a new position in organization.
            </DialogDescription>
          </DialogHeader>

          <PositionForm onSubmit={handleCreate} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <PositionFilters />
        <Button
          onClick={() => setOpen(true)}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Position
        </Button>
      </div>
      {/* Table */}
      <PositionTable positions={positions} />
    </div>
  );
}

export default Positions;
