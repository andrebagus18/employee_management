import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

function PositionFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search positions..."
          className="pl-9"
        />
      </div>

      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
        <option value="">All Departments</option>
        <option value="engineering">Engineering</option>
        <option value="human-resources">Human Resources</option>
        <option value="finance">Finance</option>
        <option value="marketing">Marketing</option>
      </select>

      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
        <option value="">All Job Levels</option>
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
    </div>
  );
}

export default PositionFilters;
