import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function PermissionFilters({ search, setSearch }) {
  return (
    <div className="flex items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search permissions..."
          className="pl-9"
        />
      </div>
    </div>
  );
}

export default PermissionFilters;
