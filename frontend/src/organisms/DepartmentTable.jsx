import { MoreHorizontal } from "lucide-react";

import { Button } from "@/components/ui/button";

function DepartmentTable({ departments }) {
  return (
    <div className="rounded-xl border bg-background">
      <div className="overflow-x-auto">
        <table className="w-full text-sm">
          <thead>
            <tr className="border-b bg-muted/30">
              <th className="px-6 py-3 text-left font-medium">Department</th>

              <th className="px-6 py-3 text-left font-medium">Description</th>

              <th className="px-6 py-3 text-left font-medium">Employees</th>

              <th className="w-12 px-4 py-3" />
            </tr>
          </thead>

          <tbody>
            {departments.map((department) => (
              <tr
                key={department.id}
                className="border-b last:border-0 hover:bg-muted/30"
              >
                <td className="px-6 py-4 font-medium">{department.name}</td>

                <td className="px-6 py-4 text-muted-foreground">
                  {department.description}
                </td>

                <td className="px-6 py-4">{department.employees}</td>

                <td className="px-4 py-4 text-right">
                  <Button variant="ghost" size="icon" className="size-8">
                    <MoreHorizontal />
                  </Button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default DepartmentTable;
