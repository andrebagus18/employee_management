import {
  getRoles,
  getRolePermissionId,
  assignPermission,
  revokePermission,
} from "@/services/role.services";
import { useCallback, useState, useEffect } from "react";
import { showError, showSuccess, showConfirm } from "../lib/alert";

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

  const assigned = async (roleId, permissionId) => {
    const result = await showConfirm({
      title: "Assign Permission?",
      text: "This permission will be assigned.",
      confirmText: "Assign",
    });
    if (!result.isConfirmed) return;
    try {
      setLoading(true);
      const response = await assignPermission(roleId, permissionId);
      // console.log("assres", response);
      showSuccess(response.msg);
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to assign permission");
      throw error;
    } finally {
      setLoading(false);
    }
  };

  const revoked = async (roleId, permissionId) => {
    const result = await showConfirm({
      title: "Revoke Permission?",
      text: "This permission will be permanently revoked.",
      confirmText: "Delete",
    });
    if (!result.isConfirmed) return;
    try {
      setLoading(true);
      const response = await revokePermission(roleId, permissionId);
      showSuccess(response.msg);
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to revoke permission");
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
    assigned,
    revoked,
  };
}
