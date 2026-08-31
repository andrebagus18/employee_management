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

import JobLevelFilters from "@/molecules/JobLevelFilters";
import JobLevelForm from "@/molecules/JobLevelForm";
import JobLevelTable from "@/organisms/JobLevelTable";

const jobLevels = [
  {
    id: 1,
    name: "Junior",
    description: "Entry-level position",
    employees: 24,
  },
  {
    id: 2,
    name: "Mid",
    description: "Intermediate-level position",
    employees: 56,
  },
  {
    id: 3,
    name: "Senior",
    description: "Experienced professional",
    employees: 38,
  },
  {
    id: 4,
    name: "Lead",
    description: "Team or technical leadership",
    employees: 10,
  },
];

function JobLevels() {
  const [open, setOpen] = useState(false);

  const handleCreate = (data) => {
    console.log("CREATE JOB LEVEL:", data);

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
          <h1 className="text-2xl font-semibold tracking-tight">Job Levels</h1>

          <p className="text-sm text-muted-foreground">
            Manage job levels in organization.
          </p>
        </div>
      </div>

      {/* Create Job Level */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Job Level</DialogTitle>

            <DialogDescription>
              Add a new job level to organization.
            </DialogDescription>
          </DialogHeader>

          <JobLevelForm onSubmit={handleCreate} onCancel={handleCancel} />
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <JobLevelFilters />
        <Button
          onClick={() => setOpen(true)}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Job Level
        </Button>
      </div>

      {/* Table */}
      <JobLevelTable jobLevels={jobLevels} />
    </div>
  );
}

export default JobLevels;
