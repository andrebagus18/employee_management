import { useParams } from "react-router-dom";
import { useEffect } from "react";
import { useEmployees } from "@/hooks/useEmployees";
import EmployeeForm from "@/molecules/EmployeeForm";
import { Button } from "@/components/ui/button";
import { ArrowLeft } from "lucide-react";
import { useNavigate } from "react-router-dom";

function EditEmployee() {
  const navigate = useNavigate();
  const { id } = useParams();
  const {
    employees,
    errors,
    loading,
    getEmployeeId,
    form,
    handleChange,
    handleUpdate,
  } = useEmployees();
  useEffect(() => {
    getEmployeeId(id);
  }, [id]);

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
            Update Employee
          </h1>

          <p className="text-sm text-muted-foreground">
            Update an employee to organization.
          </p>
        </div>
      </div>
      <EmployeeForm
        mode="edit"
        form={form}
        errors={errors}
        employees={employees}
        loading={loading}
        handleChange={handleChange}
        handleSubmit={(e) => handleUpdate(e, id)}
      />
    </div>
  );
}

export default EditEmployee;
