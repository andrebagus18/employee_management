import { getRoles } from "@/services/role.services";
import { useCallback, useState, useEffect } from "react";

export function useRoles() {
  const [roles, setRoles] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getRoles();
      return setRoles(data.roles);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchRoles();
  }, [fetchRoles]);

  return {
    roles,
    loading,
  };
}
