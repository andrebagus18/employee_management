import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { usePositions } from "@/hooks/usePositions";
import { useDepartments } from "@/hooks/useDepartments";
import FormSelect from "./FormSelect";

const statusOption = [
  {
    label: "Active",
    value: "ACTIVE",
  },
  {
    label: "Inactive",
    value: "INACTIVE",
  },
];

function EmployeeFilters({
  search,
  setSearch,
  departmentId,
  setDepartmentId,
  positionId,
  setPositionId,
  status,
  setStatus,
}) {
  const { positions } = usePositions();
  const { departments } = useDepartments();

  return (
    <div className="flex items-center justify-center gap-3">
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
      <FormSelect
        name="departmentId"
        value={departmentId}
        onChange={(e) => setDepartmentId(e.target.value)}
        options={departments.map((department) => ({
          value: String(department.id),
          label: department.name,
        }))}
        placehorder="Department"
      />
      {/* Position */}
      <FormSelect
        name="positionId"
        value={positionId}
        onChange={(e) => setPositionId(e.target.value)}
        options={positions.map((position) => ({
          value: String(position.id),
          label: position.name,
        }))}
        placehorder="Position"
      />
      {/* Status */}
      <FormSelect
        name="status"
        value={status}
        onChange={(e) => setStatus(e.target.value)}
        options={statusOption}
        placehorder="Status"
      />
    </div>
  );
}

export default EmployeeFilters;
