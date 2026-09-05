import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle, Pencil, Trash2, SearchX, RotateCcw } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function DepartmentTable({ departments, onDelete, loading, onResetFilters }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border bg-background">
      <div className="w-full max-h-80 scrollbar-hide overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Department</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(departments ?? []).length > 0 ? (
              departments.map((department, index) => (
                <TableRow key={department.id}>
                  <TableCell>{index + 1}</TableCell>
                  <TableCell>{department.name}</TableCell>
                  <TableCell className="pl-8">
                    {department._count?.employees}
                  </TableCell>
                  <TableCell className="flex gap-1">
                    <Button
                      variant="outline"
                      className="cursor-pointer"
                      onClick={() =>
                        navigate(`/departments/${department.id}/update`)
                      }
                    >
                      <Pencil />
                    </Button>
                    <Button
                      variant="destructive"
                      className="cursor-pointer"
                      onClick={() => onDelete(department.id)}
                      disabled={loading}
                    >
                      {loading ? (
                        <LoaderCircle className="size-4 animate-spin" />
                      ) : (
                        <Trash2 className="size-4" />
                      )}
                    </Button>
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
                      <p className="font-medium"> No Departments found</p>
                      <p className="text-sm text-muted-foreground">
                        Try adjusting your search
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

export default DepartmentTable;
