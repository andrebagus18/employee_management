import ActivityLogFilters from "@/molecules/ActivityLogFilters";
import ActivityLogTable from "@/organisms/ActivityLogTable";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useEffect } from "react";

function ActivityLogs() {
  const { getActivities, activities, loading, pagination, error } =
    useActivityLogs();
  useEffect(() => {
    getActivities({
      page: 1,
      limit: 10,
    });
  }, [getActivities]);
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
