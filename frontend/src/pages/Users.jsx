import { useState } from "react";
import UserFilters from "@/molecules/UserFilters";
import UserTable from "@/organisms/UserTable";

const users = [
  {
    id: 1,
    name: "Andre Bagus",
    email: "andre@company.com",
    role: "Admin",
    status: "Active",
    lastLogin: "Today, 08:42",
  },
  {
    id: 2,
    name: "John Doe",
    email: "john@company.com",
    role: "Employee",
    status: "Active",
    lastLogin: "Today, 08:15",
  },
  {
    id: 3,
    name: "Sarah Smith",
    email: "sarah@company.com",
    role: "HR",
    status: "Active",
    lastLogin: "Yesterday, 16:20",
  },
  {
    id: 4,
    name: "Michael Lee",
    email: "michael@company.com",
    role: "Manager",
    status: "Inactive",
    lastLogin: "Aug 28, 2026",
  },
];

function Users() {
  const [open, setOpen] = useState(false);
  const handleCreate = (data) => {
    console.log("CREATE USER:", data);
    setOpen(false);
  };
  const handleCancel = () => {
    setOpen(false);
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Users</h1>

          <p className="text-sm text-muted-foreground">
            Manage user accounts and access.
          </p>
        </div>
      </div>

      {/* Filters */}
      <UserFilters />

      {/* Table */}
      <UserTable users={users} />
    </div>
  );
}

export default Users;
