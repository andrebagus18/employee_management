import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

function UserFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input type="search" placeholder="Search users..." className="pl-9" />
      </div>

      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30">
        <option value="">All Roles</option>
        <option value="admin">Admin</option>
        <option value="hr">HR</option>
        <option value="manager">Manager</option>
        <option value="employee">Employee</option>
      </select>

      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30">
        <option value="">All Status</option>
        <option value="active">Active</option>
        <option value="inactive">Inactive</option>
      </select>
    </div>
  );
}

export default UserFilters;
