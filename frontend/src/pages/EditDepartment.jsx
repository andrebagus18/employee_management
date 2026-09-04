import DepartmentForm from "@/molecules/DepartmentForm";
import { useDepartments } from "@/hooks/useDepartments";
import { useParams } from "react-router-dom";
import { useEffect } from "react";

function EditDepartment() {
  const { id } = useParams;
  const { fetchDepartments, handleChange, handleUpdate, form, errors } =
    useDepartments();
  // useEffect(() => {
  //   fetchDepartments(id);
  // }, [id]);

  return (
    <DepartmentForm
      mode="edit"
      handleSubmit={(e) => handleUpdate(e, id)}
      handleChange={handleChange}
      form={form}
      errors={errors}
    />
  );
}

export default EditDepartment;
