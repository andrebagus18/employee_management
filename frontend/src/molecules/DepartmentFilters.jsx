import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";

function DepartmentFilters() {
  return (
    <div className="flex gap-2">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

        <Input
          type="search"
          placeholder="Search departments..."
          className="pl-9"
        />
      </div>
      <Button variant="outline" className="cursor-pointer px-3">
        Search
      </Button>
    </div>
  );
}

export default DepartmentFilters;
