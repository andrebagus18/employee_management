import FormField from "./EmployeeFormField";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function EmployeeForm({
  mode = "create",
  form,
  errors,
  loading,
  handleChange,
  handleSubmit,
  employees,
}) {
  const navigate = useNavigate();
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 grid lg:grid-cols-2 gap-4"
    >
      <FormField
        form={form}
        errors={errors}
        handleChange={handleChange}
        employees={employees}
      />
      {/* Actions */}
      <div className="flex justify-end gap-3 pt-6">
        <Button
          type="button"
          variant="outline"
          className="cursor-pointer"
          onClick={() => navigate("/employees")}
        >
          Cancel
        </Button>
        {mode === "create" ? (
          <Button type="submit" className="cursor-pointer" disabled={loading}>
            {loading ? "Creating..." : "Create Employee"}
          </Button>
        ) : (
          <Button type="submit" className="cursor-pointer" disabled={loading}>
            {loading ? "Update..." : "Update Employee"}
          </Button>
        )}
      </div>
    </form>
  );
}

export default EmployeeForm;
