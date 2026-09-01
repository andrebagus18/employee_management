import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";
import { Button } from "@/components/ui/button";
import EmployeeForm from "@/molecules/EmployeeForm";
import { useEmployees } from "@/hooks/useEmployees";

function CreateEmployee() {
  const navigate = useNavigate();
  const { form, error, loading, handleChange, handleSubmit, employees } =
    useEmployees();

  return (
    <div className="mx-auto w-full space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <Button
            type="button"
            variant="ghost"
            className="mb-2 -ml-3 cursor-pointer"
            onClick={() => navigate("/employees")}
          >
            <ArrowLeft />
            Back to Employees
          </Button>

          <h1 className="text-2xl font-semibold tracking-tight">
            Create Employee
          </h1>

          <p className="text-sm text-muted-foreground">
            Add a new employee to organization.
          </p>
        </div>
      </div>
      <EmployeeForm
        form={form}
        error={error}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={handleSubmit}
        employees={employees}
      />
    </div>
  );
}

export default CreateEmployee;
