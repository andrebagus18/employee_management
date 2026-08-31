import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";

function JobLevelFilters() {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search job levels..."
          className="pl-9"
        />
      </div>
    </div>
  );
}

export default JobLevelFilters;
