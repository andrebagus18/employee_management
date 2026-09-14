import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
// import { Eye, Pencil, Trash2 } from "lucide-react";
import { formatDateIndo } from "../lib/utils";
import { RotateCcw, SearchX } from "lucide-react";
import { Button } from "@/components/ui/button";

function UserTable({ users, pagination, onResetFilters }) {
  return (
    <div className="rounded-xl border bg-background">
      <div className="w-full max-h-80 scrollbar-hide overflow-y-auto">
        <Table>
          <TableHeader className="sticky top-0 z-10 bg-background">
            <TableRow>
              <TableHead>No.</TableHead>
              <TableHead>User</TableHead>
              <TableHead>Role</TableHead>
              <TableHead>Last Login Date</TableHead>
              <TableHead>Last Login Time</TableHead>
              {/* <TableHead className="w-[50px]"></TableHead> */}
            </TableRow>
          </TableHeader>

          <TableBody>
            {(users ?? []).length > 0 ? (
              users.map((user, index) => (
                <TableRow key={user.id}>
                  <TableCell>
                    {(pagination.page - 1) * pagination.limit + index + 1}
                  </TableCell>
                  <TableCell>
                    <div>
                      <p className="font-medium">{user.employee?.name}</p>
                      <p className="text-xs text-muted-foreground">
                        {user.email}
                      </p>
                    </div>
                  </TableCell>
                  <TableCell>{user.role?.name}</TableCell>
                  <TableCell>{formatDateIndo(user.last_login)}</TableCell>
                  <TableCell>
                    {new Date(user.last_login).toLocaleTimeString("id-ID", {
                      hour: "2-digit",
                      minute: "2-digit",
                    })}
                  </TableCell>
                  {/* <TableCell>
                  <ActionMenu
                    actions={[
                      {
                        label: "View",
                        icon: Eye,
                        onClick: () => console.log("VIEW", user.id),
                      },
                      {
                        label: "Edit",
                        icon: Pencil,
                        onClick: () => console.log("EDIT", user.id),
                      },
                      {
                        label: "Delete",
                        icon: Trash2,
                        variant: "destructive",
                        onClick: () => console.log("DELETE", user.id),
                      },
                    ]}
                  />
                </TableCell> */}
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

export default UserTable;
