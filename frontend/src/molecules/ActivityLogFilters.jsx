import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FormSelect from "./FormSelect";

const optionAction = [
  {
    label: "All Action",
    value: "all",
  },
  {
    label: "Create",
    value: "CREATE",
  },
  {
    label: "Update",
    value: "UPDATE",
  },
  {
    label: "Activate",
    value: "ACTIVATE",
  },
  {
    label: "Deactivate",
    value: "DEACTIVATE",
  },
];
const optionEntity = [
  {
    label: "All Entity",
    value: "all",
  },
  {
    label: "Employee",
    value: "Employee",
  },
  {
    label: "Leave Request",
    value: "Leave Request",
  },
  {
    label: "Daily Report",
    value: "Daily Report",
  },
];

function ActivityLogFilters({
  search,
  setSearch,
  action,
  setAction,
  entity,
  setEntity,
}) {
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search activity logs..."
          className="pl-9"
        />
      </div>
      <FormSelect
        name="action"
        value={action}
        onChange={(e) => setAction(e.target.value)}
        options={optionAction}
        placehorder="All Action"
      />
      <FormSelect
        name="entity"
        value={entity}
        onChange={(e) => setEntity(e.target.value)}
        options={optionEntity}
        placehorder="All Entity"
      />
    </div>
  );
}

export default ActivityLogFilters;
