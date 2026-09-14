import { Search, RotateCcw } from "lucide-react";
import { Input } from "@/components/ui/input";
import { useRoles } from "@/hooks/useRoles";
import FormSelect from "./FormSelect";
import { Button } from "@/components/ui/button";

function UserFilters({ search, setSearch, roleId, setRoleId, onResetFilters }) {
  const { roles } = useRoles();
  return (
    <div className="flex flex-col gap-3 sm:flex-row sm:items-center">
      <div className="relative w-full sm:max-w-sm">
        <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />
        <Input
          type="search"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          placeholder="Search users..."
          className="pl-9"
        />
      </div>
      <FormSelect
        name="roleId"
        value={roleId}
        onChange={(e) => setRoleId(e.target.value)}
        options={roles.map((role) => ({
          value: String(role.id),
          label: role.name,
        }))}
        placeholder="Role"
      />
      <Button
        type="button"
        onClick={onResetFilters}
        variant="outline"
        className="cursor-pointer"
      >
        <RotateCcw className="sixe-4 text-muted-foreground" />
      </Button>
    </div>
  );
}

export default UserFilters;
