import { useCallback, useEffect, useState } from "react";
import { getEmployees } from "@/services/employee.service";
import { showError } from "../lib/alert";

export function useEmployees() {
  const [employees, setEmployees] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchEmployees = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getEmployees();
      setEmployees(data.employees);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchEmployees();
  }, [fetchEmployees]);
  return {
    employees,
    loading,
    refetch: fetchEmployees,
  };
}
