import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Eye, Pencil, Trash2 } from "lucide-react";
import ActionMenu from "@/molecules/ActionMenu";
import { Badge } from "@/components/ui/badge";

function DailyReportTable({ reports }) {
  const getStatusVariant = (status) => {
    if (status === "Submitted") return "default";
    if (status === "Reviewed") return "destructive";
    return "secondary";
  };

  return (
    <div className="rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Employee</TableHead>
              <TableHead>Date</TableHead>
              <TableHead>Summary</TableHead>
              <TableHead>Hours</TableHead>
              <TableHead>Status</TableHead>
              <TableHead className="w-[50px]"></TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {reports.map((report) => (
              <TableRow key={report.id}>
                <TableCell>
                  <div>
                    <p className="font-medium">{report.employee}</p>
                    <p className="text-xs text-muted-foreground">
                      {report.email}
                    </p>
                  </div>
                </TableCell>
                <TableCell>{report.date}</TableCell>
                <TableCell>{report.summary}</TableCell>
                <TableCell>{report.hours}</TableCell>
                <TableCell>
                  <Badge variant={getStatusVariant(report.status)}>
                    {report.status}
                  </Badge>
                </TableCell>
                <TableCell>
                  <ActionMenu
                    actions={[
                      {
                        label: "View",
                        icon: Eye,
                        onClick: () => console.log("VIEW", report.id),
                      },
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => console.log("EDIT", report.id),
                      },
                      {
                        label: "Delete",
                        icon: Trash2,
                        variant: "destructive",
                        onClick: () => console.log("DELETE", report.id),
                      },
                    ]}
                  />
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </div>
    </div>
  );
}

export default DailyReportTable;
