import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { Pencil, Trash2, LoaderCircle } from "lucide-react";

function JobLevelTable({ jobLevels, loading, onEdit }) {
  const disabled = true;

  return (
    <div className="rounded-xl border bg-background">
      <div className="w-full max-h-80 scrollbar-hide overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Job Levels</TableHead>
              <TableHead>Employees</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {jobLevels.map((jobLevel, index) => (
              <TableRow key={jobLevel.id}>
                <TableCell>{index + 1}</TableCell>
                <TableCell>{jobLevel.name}</TableCell>
                <TableCell>{jobLevel._count?.employees}</TableCell>
                <TableCell className="flex gap-1">
                  <Button
                    variant="outline"
                    className="cursor-pointer"
                    onClick={() => onEdit(jobLevel.id)}
                  >
                    <Pencil />
                  </Button>
                  <Button
                    className="disabled:pointer-events-auto disabled:cursor-not-allowed disabled:bg-gray-400"
                    onClick={() => onDelete(department.id)}
                    disabled={disabled}
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

export default JobLevelTable;
