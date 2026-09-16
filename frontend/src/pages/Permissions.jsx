import PermissionFilters from "@/molecules/PermissionFilters";
import PermissionTable from "@/organisms/PermissionTable";
import PermissionForm from "@/molecules/PermissionForm";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
} from "@/components/ui/dialog";
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "@/components/ui/pagination";
import { Button } from "@/components/ui/button";
import { CirclePlus } from "lucide-react";
import { usePermissions } from "../hooks/usePermissions";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";

function Permissions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const {
    permissions,
    fetchPermissions,
    loading,
    form,
    setForm,
    errors,
    open,
    setOpen,
    search,
    setSearch,
    pagination,
    resetFilters,
    handleCancel,
    handleChange,
    handleSubmit,
    deleted,
  } = usePermissions({ id });

  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPermissions({
        page: 1,
        limit: 10,
        search,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchPermissions, search]);

  const handleEdit = (id) => {
    setOpen(true);
    navigate(`/permissions/${id}/update`);
  };

  const handlePage = (page) => {
    fetchPermissions({
      page,
      limit: pagination.limit,
      search,
    });
  };

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">Permissions</h1>
        <p className="text-sm text-muted-foreground">
          Manage system permissions and access capabilities.
        </p>
      </div>

      {/* Create Permission */}
      <Dialog open={open} onOpenChange={setOpen}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Permission</DialogTitle>

            <DialogDescription>
              Create a new permission for the organization.
            </DialogDescription>
          </DialogHeader>

          <PermissionForm
            permissions={permissions}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            onCancel={handleCancel}
            form={form}
            setForm={setForm}
            id={id}
            loading={loading}
            errors={errors}
          />
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <PermissionFilters search={search} setSearch={setSearch} />
        <Button
          onClick={() => setOpen(true)}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Permission
        </Button>
      </div>

      {/* Table */}
      <PermissionTable
        permissions={permissions}
        loading={loading}
        onEdit={handleEdit}
        pagination={pagination}
        onResetFilters={resetFilters}
        onDelete={deleted}
      />
      <div className="flex items-center justify-between border-t pt-4">
        <div className="text-sm text-muted-foreground">
          Showing{" "}
          {pagination.total === 0
            ? 0
            : (pagination.page - 1) * pagination.limit + 1}{" "}
          - {Math.min(pagination.page * pagination.limit, pagination.total)} of{" "}
          {pagination.total} positions
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

export default Permissions;
