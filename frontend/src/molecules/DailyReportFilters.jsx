import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";

function DailyReportFilters() {
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
      <Input type="date" className="w-full sm:w-auto" />
      <select className="h-9 rounded-md border border-input bg-background px-3 text-sm outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30">
        <option value="">All Status</option>
        <option value="submitted">Submitted</option>
        <option value="draft">Draft</option>
        <option value="reviewed">Reviewed</option>
      </select>
    </div>
  );
}

export default DailyReportFilters;
