import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function LeaveRequestFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search employees..."
          className="pl-9"
        />
      </div>

      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30">
        <option value="">All Leave Types</option>
        <option value="annual">Annual Leave</option>
        <option value="sick">Sick Leave</option>
        <option value="personal">Personal Leave</option>
      </select>

      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30">
        <option value="">All Status</option>
        <option value="pending">Pending</option>
        <option value="approved">Approved</option>
        <option value="rejected">Rejected</option>
      </select>
    </div>
  );
}

export default LeaveRequestFilters;
