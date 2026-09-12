import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import LeaveRequestFilters from "@/molecules/LeaveRequestFilters";
import LeaveRequestTable from "@/organisms/LeaveRequestTable";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

function LeaveRequests() {
  const {
    leaveRequests,
    fetchLeaveRequests,
    loading,
    pagination,
    search,
    setSearch,
    type,
    setType,
    status,
    setStatus,
    actionLoading,
    handleApprove,
    handleReject,
    resetFilters,
  } = useLeaveRequests();
  const navigate = useNavigate();
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchLeaveRequests({
        page: 1,
        limit: 10,
        search,
        type,
        status,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchLeaveRequests, search, type, status]);

  const handlePage = (page) => {
    fetchLeaveRequests({
      page,
      limit: pagination.limit,
      search,
      type,
      status,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">
            Leave Requests
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage employee leave requests.
          </p>
        </div>
      </div>

      {/* Create Request Dialog */}
      {/* <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Leave Request</DialogTitle>

            <DialogDescription>
              Create a leave request to employee.
            </DialogDescription>
          </DialogHeader>
          
          <LeaveRequestForm onSubmit={handleCreate} onCancel={handleCancel} />
        </DialogContent>
      </Dialog> */}

      {/* Filters */}
      <div className="flex justify-between items-center">
        <LeaveRequestFilters
          leaveRequests={leaveRequests}
          search={search}
          setSearch={setSearch}
          type={type}
          setType={setType}
          status={status}
          setStatus={setStatus}
        />
        <Button
          onClick={() => navigate("/leave-requests/create")}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Leave Request
        </Button>
      </div>

      {/* Table */}
      <LeaveRequestTable
        leaveRequests={leaveRequests}
        loading={loading}
        actionLoading={actionLoading}
        handleApprove={handleApprove}
        handleReject={handleReject}
        pagination={pagination}
        onResetFilters={resetFilters}
      />
      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {pagination.total === 0
            ? 0
            : (pagination.page - 1) * pagination.limit + 1}{" "}
          - {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
          {pagination.total} position
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

export default LeaveRequests;
