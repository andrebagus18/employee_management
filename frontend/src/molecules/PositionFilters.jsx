import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import FormSelect from "./FormSelect";
import { useDepartments } from "@/hooks/useDepartments";

function PositionFilters() {
  const { departments, departmentId, setDepartmentId } = useDepartments();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          placeholder="Search positions..."
          className="pl-9"
        />
      </div>
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
    </div>
  );
}

export default PositionFilters;
