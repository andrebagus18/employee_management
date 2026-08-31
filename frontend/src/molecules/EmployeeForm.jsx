import FormField from "./EmployeeFormField";

function EmployeeForm() {
  const handleSubmit = (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    console.log("CREATE EMPLOYEE:", Object.fromEntries(formData));
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="space-y-6 grid lg:grid-cols-2 gap-4"
    >
      <FormField />
    </form>
  );
}

export default EmployeeForm;
