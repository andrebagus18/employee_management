import { getDepartments } from "@/services/department.services";
import { useCallback, useState, useEffect } from "react";

export function useDepartments() {
  const [departments, setDepartments] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchDepartments = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getDepartments();
      return setDepartments(data.departments);
    } catch (error) {
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  return {
    departments,
    fetchDepartments,
    loading,
  };
}
