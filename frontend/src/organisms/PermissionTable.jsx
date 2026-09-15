import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, SearchX, RotateCcw } from "lucide-react";
import ActionMenu from "@/molecules/ActionMenu";

function PermissionTable({ permissions, onEdit, pagination, onResetFilters }) {
  return (
    <div className="rounded-xl border bg-background">
      <div className="w-full max-h-80 scrollbar-hide overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Permission Module</TableHead>
              <TableHead>Description</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(permissions ?? []).length > 0 ? (
              permissions.map((permission, index) => (
                <TableRow key={permission.id}>
                  <TableCell>
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </TableCell>
                  <TableCell>{permission.name}</TableCell>
                  <TableCell>{permission.description}</TableCell>
                  <TableCell>
                    <ActionMenu
                      actions={[
                        {
                          label: "Edit",
                          icon: Pencil,
                          onClick: () => onEdit(permission.id),
                        },
                        {
                          label: "Delete",
                          icon: Trash2,
                          variant: "destructive",
                          onClick: () => console.log("DELETE", permission.id),
                        },
                      ]}
                    />
                  </TableCell>
                </TableRow>
              ))
            ) : (
              <TableRow>
                <TableCell colSpan={8} className="h-48 text-center">
                  <div className="flex flex-col items-center justify-center gap-3">
                    <div className="flex size-12 items-center justify-center rounded-full bg-muted">
                      <SearchX className="size-10 text-muted-foreground animate-[bounce_1.5s_ease-in-out_infinite]" />
                    </div>
                    <div>
                      <p className="font-medium"> No positions found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search or filters
                      </p>
                    </div>
                    <Button
                      variant="outline"
                      onClick={onResetFilters}
                      className="gap-2 border border-slate-400/50 cursor-pointer bg-slate-200 hover:bg-slate-400/30"
                    >
                      <RotateCcw className="sixe-4" />
                      Reset Filters
                    </Button>
                  </div>
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default PermissionTable;
