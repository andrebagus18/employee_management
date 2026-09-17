import { getRoles, getRolePermissionId } from "@/services/role.services";
import { useCallback, useState, useEffect } from "react";
import { showError } from "../lib/alert";

export function useRoles() {
  const [roles, setRoles] = useState([]);
  const [rolePermission, setRolePermission] = useState([]);
  const [loading, setLoading] = useState(false);

  const fetchRoles = useCallback(async () => {
    try {
      setLoading(true);
      const response = await getRoles();
      return setRoles(response.roles);
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

  const getPermissionId = async (id) => {
    try {
      setLoading(true);
      const response = await getRolePermissionId(id);
      const role = response.rolePermission;
      setRolePermission(role);
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to load permissions");
    } finally {
      setLoading(false);
    }
  };

  return {
    roles,
    fetchRoles,
    loading,
    getPermissionId,
    rolePermission,
  };
}
