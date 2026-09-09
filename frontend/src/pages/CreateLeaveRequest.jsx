import LeaveRequestForm from "@/molecules/LeaveRequestForm";
import { useLeaveRequests } from "@/hooks/useLeaveRequests";
import { Button } from "@/components/ui/button";
import { ArrowLeft, Handshake } from "lucide-react";
import { useNavigate } from "react-router-dom";

function CreateLeaveRequest() {
  const navigate = useNavigate();
  const { leaveRequests, handleSubmit, handleChange, form, setForm, errors } =
    useLeaveRequests();
  const handleCancel = () => {
    setForm({
      type: "",
      description: "",
      start_date: "",
      end_date: "",
    });
    navigate("/leave-requests");
  };
  return (
    <div className="mx-auto w-full space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            type="button"
            variant="ghost"
            className="mb-2 -ml-3 cursor-pointer"
            onClick={() => navigate("/leave-requests")}
          >
            <ArrowLeft />
            Back to Leave Request
          </Button>

          <h1 className="text-2xl font-semibold tracking-tight">
            Create a Leave Request to employee.
          </h1>

          <p className="text-sm text-muted-foreground">
            Add a new leave request.
          </p>
        </div>
      </div>
      <LeaveRequestForm
        leaveRequests={leaveRequests}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        form={form}
        errors={errors}
        onCancel={handleCancel}
      />
    </div>
  );
}

export default CreateLeaveRequest;
