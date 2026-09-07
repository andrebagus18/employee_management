import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Pencil, Trash2 } from "lucide-react";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function PositionTable({ positions, loading, onEdit }) {
  const navigate = useNavigate();
  // const disabled = true;
  return (
    <div className="rounded-xl border bg-background">
      <div className="w-full max-h-80 scrollbar-hide overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Positions</TableHead>
              <TableHead>Departments</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {positions.map((position, index) => (
              <TableRow key={position.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{position.name}</TableCell>
                <TableCell>{position.department?.name}</TableCell>
                <TableCell className="pl-8">
                  {position._count?.employees}
                </TableCell>
                <TableCell>
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={
                      () => onEdit(position.id)
                      // navigate(`/positions/${position.id}/update`)
                    }
                  >
                    <Pencil />
                  </Button>
                  <Button
                    variant="destructive"
                    // className="disabled:cursor-not-allowed disabled:bg-gray-400"
                    onClick={() => onDelete(department.id)}
                    // disabled={disabled}
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

export default PositionTable;
