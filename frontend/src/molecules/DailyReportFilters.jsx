import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FormDate from "./FormDate";

function DailyReportFilters({ search, setSearch, date, setDate }) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search employees..."
          className="pl-9"
        />
      </div>
      <FormDate
        name="date"
        value={date}
        onChange={(e) => setDate(e.target.value)}
        className="w-50!"
      />
    </div>
  );
}

export default DailyReportFilters;
