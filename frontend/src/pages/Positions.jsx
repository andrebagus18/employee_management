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
import PositionFilters from "@/molecules/PositionFilters";
import PositionForm from "@/molecules/PositionForm";
import PositionTable from "@/organisms/PositionTable";
import { usePositions } from "@/hooks/usePositions";

function Positions() {
  const [edit, setEdit] = useState(null);
  const {
    positions,
    open,
    setOpen,
    loading,
    fetchPositions,
    form,
    errors,
    handleChange,
    handleSubmit,
    handleCancel,
  } = usePositions();
  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  const handleEdit = (id) => {
    setEdit(id);
    setOpen(true);
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
            form={form}
            errors={errors}
            handleChange={handleChange}
            handleSubmit={handleSubmit}
            // id={edit}
          />
        </DialogContent>
      </Dialog>

      {/* Filters */}
      <div className="flex justify-between items-center">
        <PositionFilters />
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
        loading={loading}
        setOpen={setOpen}
        onEdit={handleEdit}
      />
    </div>
  );
}

export default Positions;
