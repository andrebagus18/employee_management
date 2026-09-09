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
import JobLevelFilters from "@/molecules/JobLevelFilters";
import JobLevelForm from "@/molecules/JobLevelForm";
import JobLevelTable from "@/organisms/JobLevelTable";
import { useJobLevels } from "@/hooks/useJobLevels";
import { useNavigate, useParams } from "react-router-dom";

function JobLevels() {
  const { id } = useParams();
  const {
    jobLevels,
    fetchJobLevels,
    loading,
    errors,
    form,
    setForm,
    open,
    setOpen,
    handleSubmit,
    handleChange,
  } = useJobLevels({ id });
  const navigate = useNavigate();
  const handleEdit = (id) => {
    setOpen(true);
    navigate(`/job-levels/${id}/update`);
  };

  const handleCancel = () => {
    setForm({ name: "" });
    setOpen(false);
    navigate("/job-levels");
  };
  useEffect(() => {
    fetchJobLevels();
  }, [fetchJobLevels]);
  //efect reload url
  useEffect(() => {
    const navigation = performance.getEntriesByType("navigation")[0];
    if (navigation?.type === "reload" && id) {
      navigate("/job-levels", { replace: true });
    }
  }, []);

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-start gap-4">
        <div>
          <h1 className="text-2xl font-semibold tracking-tight">Job Levels</h1>
          <p className="text-sm text-muted-foreground">
            Manage job levels in organization.
          </p>
        </div>
      </div>

      {/* Create Job Level */}
      <Dialog
        open={open}
        onOpenChange={(value) => {
          setOpen(value);
          if (!value) {
            handleCancel();
          }
        }}
      >
        <DialogContent className="sm:max-w-md">
          <DialogHeader>
            <DialogTitle>Create Job Level</DialogTitle>
            <DialogDescription>
              Add a new job level to organization.
            </DialogDescription>
          </DialogHeader>
          <JobLevelForm
            jobLevels={jobLevels}
            handleSubmit={handleSubmit}
            handleChange={handleChange}
            onCancel={handleCancel}
            errors={errors}
            form={form}
            setForm={setForm}
            loading={loading}
            id={id}
          />
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <JobLevelFilters />
        <Button
          onClick={() => setOpen(true)}
          className="max-w-3xs w-full gap-4 py-5 text-md cursor-pointer"
        >
          <CirclePlus className="size-5" />
          Add Job Level
        </Button>
      </div>

      {/* Table */}
      <JobLevelTable
        jobLevels={jobLevels}
        loading={loading}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default JobLevels;
