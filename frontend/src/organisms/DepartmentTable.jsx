import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { LoaderCircle, Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function DepartmentTable({ departments, onDelete, loading }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border bg-background">
      <div className="w-full max-h-80 scrollbar-hide overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Name</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {departments.map((department, index) => (
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
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DepartmentTable;
