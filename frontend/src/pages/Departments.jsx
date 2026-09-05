import { useEffect, useState } from "react";
import { Building2 } from "lucide-react";
import DepartmentFilters from "@/molecules/DepartmentFilters";
import DepartmentForm from "@/molecules/DepartmentForm";
import DepartmentTable from "@/organisms/DepartmentTable";
import { useDepartments } from "@/hooks/useDepartments";
import { useParams } from "react-router-dom";

function Departments() {
  const { id } = useParams();
  const mode = id ? "edit" : "create";
  const {
    departments,
    fetchDepartments,
    handleCancel,
    handleChange,
    handleSubmit,
    form,
    setForm,
    errors,
    loading,
    deleted,
  } = useDepartments({ mode, id });

  useEffect(() => {
    fetchDepartments();
  }, [fetchDepartments]);

  // console.log("mode", mode);
  // console.log("id", id);
  return (
    <div className="space-y-4">
      {/* Header */}
      <div className="flex items-start justify-between gap-4">
        <div>
          <h1 className="text-2xl flex gap-2 items-center font-semibold tracking-tight">
            Departments
            <Building2 className="text-slate-400" />
          </h1>

          <p className="text-sm text-muted-foreground">
            Manage your organization's departments.
          </p>
        </div>

        {/* Create Department */}
        {/* <Dialog open={open} onOpenChange={setOpen}>
          <DialogContent className="sm:max-w-xl">
            <DialogHeader>
              <DialogTitle>Create Department</DialogTitle>

              <DialogDescription>
                Add a new department to organization.
              </DialogDescription>
            </DialogHeader>
          </DialogContent>
        </Dialog> */}
      </div>

      {/* Filters */}
      <div className="w-full flex justify-between items-center">
        <DepartmentFilters />
        {/* <Button
          className="max-w-3xs w-full flex gap-4 py-5 text-md cursor-pointer"
          onClick={() => setOpen(true)}
        >
          <CirclePlus className="size-5" />
          Add Department
        </Button> */}
      </div>

      {/* Table */}
      <div className="grid grid-cols-2 gap-3">
        <DepartmentTable
          departments={departments}
          onDelete={deleted}
          loading={loading}
        />
        <DepartmentForm
          departments={departments}
          handleSubmit={handleSubmit}
          handleChange={handleChange}
          mode={mode}
          id={id}
          form={form}
          setForm={setForm}
          errors={errors}
          loading={loading}
          onResetForm={handleCancel}
        />
      </div>
    </div>
  );
}

export default Departments;
