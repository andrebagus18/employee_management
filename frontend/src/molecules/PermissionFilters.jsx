import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

function PermissionFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search permissions..."
          className="pl-9"
        />
      </div>

      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30">
        <option value="">All Modules</option>
        <option value="employees">Employees</option>
        <option value="departments">Departments</option>
        <option value="positions">Positions</option>
        <option value="job-levels">Job Levels</option>
        <option value="leave-requests">Leave Requests</option>
        <option value="users">Users</option>
      </select>

      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30">
        <option value="">All Actions</option>
        <option value="view">View</option>
        <option value="create">Create</option>
        <option value="update">Update</option>
        <option value="delete">Delete</option>
      </select>
    </div>
  );
}

export default PermissionFilters;
