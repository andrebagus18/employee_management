import ActivityLogFilters from "@/molecules/ActivityLogFilters";
import ActivityLogTable from "@/organisms/ActivityLogTable";

const activities = [
  {
    id: 1,
    user: "Andre Bagus",
    email: "andre@company.com",
    action: "Login",
    module: "Authentication",
    description: "User logged into the system.",
    date: "Aug 31, 2026 08:42",
  },
  {
    id: 2,
    user: "Sarah Smith",
    email: "sarah@company.com",
    action: "Create",
    module: "Employees",
    description: "Created a new employee John Doe.",
    date: "Aug 31, 2026 08:35",
  },
  {
    id: 3,
    user: "Michael Lee",
    email: "michael@company.com",
    action: "Update",
    module: "Leave Requests",
    description: "Approved a leave request.",
    date: "Aug 31, 2026 08:21",
  },
  {
    id: 4,
    user: "Sarah Smith",
    email: "sarah@company.com",
    action: "Update",
    module: "Employees",
    description: "Updated employee information.",
    date: "Aug 31, 2026 08:05",
  },
  {
    id: 5,
    user: "Andre Bagus",
    email: "andre@company.com",
    action: "Delete",
    module: "Departments",
    description: "Deleted an inactive department.",
    date: "Aug 30, 2026 17:42",
  },
];

function ActivityLogs() {
  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Activity Logs</h1>

        <p className="text-sm text-muted-foreground">
          Monitor activities and changes made across the organization.
        </p>
      </div>

      {/* Filters */}
      <ActivityLogFilters />

      {/* Table */}
      <ActivityLogTable activities={activities} />
    </div>
  );
}

export default ActivityLogs;
