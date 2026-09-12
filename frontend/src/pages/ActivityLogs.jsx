import ActivityLogFilters from "@/molecules/ActivityLogFilters";
import ActivityLogTable from "@/organisms/ActivityLogTable";
import { useActivityLogs } from "@/hooks/useActivityLogs";
import { useEffect } from "react";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function ActivityLogs() {
  const {
    getActivities,
    activities,
    loading,
    pagination,
    error,
    search,
    setSearch,
    action,
    setAction,
    entity,
    setEntity,
    resetFilters,
  } = useActivityLogs();
  useEffect(() => {
    const timer = setTimeout(() => {
      getActivities({
        page: 1,
        limit: 10,
        search,
        action,
        entity,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [getActivities, search, action, entity]);
  const handlePage = (page) => {
    getActivities({
      page,
      limit: pagination.limit,
      search,
      action,
      entity,
    });
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Activity Logs</h1>

        <p className="text-sm text-muted-foreground">
          Monitor activities and changes made across the organization.
        </p>
      </div>

      {/* Filters */}
      <ActivityLogFilters
        search={search}
        setSearch={setSearch}
        action={action}
        setAction={setAction}
        entity={entity}
        setEntity={setEntity}
      />

      {/* Table */}
      <ActivityLogTable
        activities={activities}
        loading={loading}
        onResetFilters={resetFilters}
        pagination={pagination}
      />
      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {pagination.total === 0
            ? 0
            : (pagination.page - 1) * pagination.limit + 1}{" "}
          - {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
          {pagination.total} activities
        </div>
        <div className="flex items-center gap-6">
          <Pagination>
            <PaginationContent>
              <PaginationItem>
                <PaginationPrevious
                  onClick={() => handlePage(pagination.page - 1)}
                  className={
                    pagination.page === 1
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
              {Array.from(
                { length: pagination.totalPage },
                (_, index) => index + 1,
              ).map((page) => (
                <PaginationItem key={page}>
                  <PaginationLink
                    isActive={pagination.page === page}
                    onClick={() => handlePage(page)}
                    className="cursor-pointer"
                  >
                    {page}
                  </PaginationLink>
                </PaginationItem>
              ))}
              <PaginationItem>
                <PaginationNext
                  onClick={() => handlePage(pagination.page + 1)}
                  className={
                    pagination.page === pagination.totalPage
                      ? "pointer-events-none opacity-50"
                      : "cursor-pointer"
                  }
                />
              </PaginationItem>
            </PaginationContent>
          </Pagination>
        </div>
      </div>
    </div>
  );
}

export default ActivityLogs;
