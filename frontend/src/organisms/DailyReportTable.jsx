import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Button } from "@/components/ui/button";
import { SearchX, RotateCcw } from "lucide-react";
import { CalculateTime, formatDateIndo } from "../lib/utils";
import { useNavigate } from "react-router-dom";

function DailyReportTable({ reports }) {
  const navigate = useNavigate();
  return (
    <div className="rounded-xl border bg-background">
      <div className="w-full max-h-80 scrollbar-hide overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Start Time</TableHead>
              <TableHead>End Time</TableHead>
              <TableHead>Total Hours</TableHead>
              <TableHead>Description</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {(reports ?? []).length > 0 ? (
              reports.map((report, index) => (
                <TableRow
                  key={report.id}
                  onClick={(e) =>
                    navigate(`/daily-reports/${report.id}/update`)
                  }
                >
                  <TableCell>{index + 1}</TableCell>
                  <TableCell className="font-medium capitalize">
                    {report.employee?.name}
                  </TableCell>
                  <TableCell>{formatDateIndo(report.report_date)}</TableCell>
                  <TableCell>{report.start_time}</TableCell>
                  <TableCell>{report.end_time}</TableCell>
                  <TableCell>
                    {CalculateTime(report.start_time, report.end_time)}
                  </TableCell>
                  <TableCell className="whitespace-normal wrap-break-words">
                    {report.report}
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
                      // onClick={onResetFilters}
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

export default DailyReportTable;
