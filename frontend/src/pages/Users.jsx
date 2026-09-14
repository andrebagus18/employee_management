import { useEffect } from "react";
import UserFilters from "@/molecules/UserFilters";
import UserTable from "@/organisms/UserTable";
import { useUsers } from "@/hooks/useUsers";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";

function Users() {
  const {
    users,
    fetchUsers,
    search,
    setSearch,
    roleId,
    setRoleId,
    pagination,
    resetFilters,
  } = useUsers();

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchUsers({
        search,
        roleId,
        page: 1,
        limit: 10,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchUsers, search, roleId]);

  const handlePage = (page) => {
    fetchUsers({
      page,
      limit: pagination.limit,
      search,
      roleId,
    });
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
      <UserFilters
        search={search}
        setSearch={setSearch}
        roleId={roleId}
        setRoleId={setRoleId}
        onResetFilters={resetFilters}
      />

      {/* Table */}
      <UserTable
        users={users}
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
          {pagination.total} users
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

export default Users;
