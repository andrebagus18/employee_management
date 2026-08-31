import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function EmployeeFilters() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [jobLevel, setJobLevel] = useState("all");
  const [status, setStatus] = useState("all");

  return (
    <div className="flex gap-3">
      {/* Search */}
      <div className="relative flex-1">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          placeholder="Search employees..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="pl-9"
        />
      </div>
      {/* Department */}
      <select
        value={department}
        onChange={(e) => setDepartment(e.target.value)}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
      >
        <option value="all">All Departments</option>
        <option value="engineering">Engineering</option>
        <option value="hr">Human Resources</option>
        <option value="finance">Finance</option>
      </select>
      {/* Job Level */}
      <select
        value={jobLevel}
        onChange={(e) => setJobLevel(e.target.value)}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
      >
        <option value="all">All Job Levels</option>
        <option value="junior">Junior</option>
        <option value="mid">Mid</option>
        <option value="senior">Senior</option>
      </select>
      {/* Status */}
      <select
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
      >
        <option value="all">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}

export default EmployeeFilters;
