import { useEffect } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import DailyReportFilters from "@/molecules/DailyReportFilters";
import DailyReportTable from "@/organisms/DailyReportTable";
import { useDailyReports } from "@/hooks/useDailyReports";
import { useNavigate } from "react-router-dom";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function DailyReports() {
  const {
    fetchDailyReports,
    reports,
    loading,
    handleCancel,
    search,
    setSearch,
    date,
    setDate,
    pagination,
    resetFilters,
  } = useDailyReports();
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchDailyReports({
        search,
        report_date: date,
        page: 1,
        limit: 15,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchDailyReports, search, date]);

  const handlePage = (page) => {
    fetchDailyReports({
      page,
      limit: pagination.limit,
      search,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Daily Reports
          </h1>
          <p className="text-sm text-muted-foreground">
            Monitor employee daily work reports.
          </p>
        </div>
      </div>

      {/* Create Report */}
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Daily Report</DialogTitle>

            <DialogDescription>
              Add a daily work report for the organization.
            </DialogDescription>
          </DialogHeader>

          <DailyReportForm />
        </DialogContent>
      </Dialog> */}

      {/* Filters */}
      <div className="flex justify-between items-center">
        <DailyReportFilters
          search={search}
          setSearch={setSearch}
          date={date}
          setDate={setDate}
        />
        <Button
          onClick={() => navigate("/daily-reports/create")}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Daily Report
        </Button>
      </div>

      {/* Table */}
      <DailyReportTable
        reports={reports}
        pagination={pagination}
        handleCancel={handleCancel}
        onResetFilters={resetFilters}
      />
      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {pagination.total === 0
            ? 0
            : (pagination.page - 1) * pagination.limit + 1}{" "}
          - {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
          {pagination.total} daily reports
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

export default DailyReports;
