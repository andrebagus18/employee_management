import FormField from "./EmployeeFormField";
import { Button } from "@/components/ui/button";

function EmployeeForm({ form, error, loading, handleChange, handleSubmit }) {
  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 grid lg:grid-cols-2 gap-4"
    >
      <FormField
        form={form}
        error={error}
        loading={loading}
        handleChange={handleChange}
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
        <Button type="submit" className="cursor-pointer" disabled={loading}>
          {" "}
          {loading ? "Creating..." : "Create Employee"}
        </Button>
      </div>
    </form>
  );
}

export default EmployeeForm;
