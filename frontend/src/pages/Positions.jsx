import { useEffect, useState } from "react";
import { CirclePlus } from "lucide-react";
import { Button } from "@/components/ui/button";
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
import PositionFilters from "@/molecules/PositionFilters";
import PositionForm from "@/molecules/PositionForm";
import PositionTable from "@/organisms/PositionTable";
import { usePositions } from "@/hooks/usePositions";
import { useNavigate, useParams } from "react-router-dom";

function Positions() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [edit, setEdit] = useState(null);
  const {
    positions,
    open,
    setOpen,
    loading,
    fetchPositions,
    form,
    setForm,
    errors,
    handleChange,
    handleSubmit,
    handleCancel,
    deleted,
    search,
    setSearch,
    departmentId,
    setDepartmentId,
    pagination,
    resetFilters,
  } = usePositions({ id });
  useEffect(() => {
    const timer = setTimeout(() => {
      fetchPositions({
        page: 1,
        limit: 10,
        search,
        departmentId,
      });
    }, 500);
    return () => clearTimeout(timer);
  }, [fetchPositions, search, departmentId]);

  const handlePage = (page) => {
    fetchPositions({
      page,
      limit: pagination.limit,
      search,
      departmentId,
    });
  };

  const handleEdit = (id) => {
    setOpen(true);
    navigate(`/positions/${id}/update`);
  };

  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Positions</h1>
          <p className="text-sm text-muted-foreground">
            Manage positions in organization.
          </p>
        </div>
      </div>

      {/* Create Position Dialog */}
      <Dialog open={open} onOpenChange={setOpen} edit={edit}>
        <DialogContent className="sm:max-w-xl">
          <DialogHeader>
            <DialogTitle>Create Position</DialogTitle>
            <DialogDescription>
              Add a new position in organization.
            </DialogDescription>
          </DialogHeader>
          <PositionForm
            onCancel={handleCancel}
            loading={loading}
            form={form}
            setForm={setForm}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            id={id}
            fetchPositions={fetchPositions}
            positions={positions}
          />
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <PositionFilters
          search={search}
          setSearch={setSearch}
          departmentId={departmentId}
          setDepartmentId={setDepartmentId}
        />
        <Button
          onClick={() => setOpen(true)}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Position
        </Button>
      </div>
      {/* Table */}
      <PositionTable
        positions={positions}
        pagination={pagination}
        loading={loading}
        setOpen={setOpen}
        onEdit={handleEdit}
        onDelete={deleted}
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

export default Positions;
