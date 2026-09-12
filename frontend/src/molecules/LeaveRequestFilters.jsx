import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FormSelect from "./FormSelect";

const optionType = [
  {
    label: "All Type",
    value: "all",
  },
  {
    label: "ANNUAL",
    value: "ANNUAL",
  },
  {
    label: "SICK",
    value: "SICK",
  },
  {
    label: "PERSONAL",
    value: "PERSONAL",
  },
];
const optionStatus = [
  {
    label: "All Status",
    value: "all",
  },
  {
    label: "PENDING",
    value: "PENDING",
  },
  {
    label: "APPROVE",
    value: "APPROVE",
  },
  {
    label: "REJECT",
    value: "REJECT",
  },
];

function LeaveRequestFilters({
  search,
  setSearch,
  type,
  setType,
  status,
  setStatus,
  leaveRequests,
}) {
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
      <FormSelect
        name="type"
        value={type}
        onChange={(e) => setType(e.target.value)}
        options={optionType}
        placehorder="All Type"
      />
      <FormSelect
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={optionStatus}
        placehorder="All Status"
      />
    </div>
  );
}

export default LeaveRequestFilters;
