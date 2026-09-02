import { useEmployees } from "@/hooks/useEmployees";
import { useEffect } from "react";
import { useParams } from "react-router-dom";

function EmployeeDetail() {
  const { id } = useParams();
  const { getEmployeeId, employee } = useEmployees();
  useEffect(() => {
    getEmployeeId(id);
  }, [id]);
  useEffect(() => {
    console.log("url id", id);
    console.log("employee detail", employee);
  }, [employee, id]);
}

export default EmployeeDetail;
