import { getUsers } from "@/services/user.services";
import { useState, useEffect, useCallback } from "react";
import { showError, showSuccess } from "@/lib/alert";

export function useUsers() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [search, setSearch] = useState("");
  const [roleId, setRoleId] = useState("");
  const [pagination, setPagination] = useState({
    page: 1,
    limit: 10,
    total: 0,
    totalPage: 0,
  });

  const fetchUsers = useCallback(async (params = {}) => {
    try {
      setLoading(true);
      const response = await getUsers(params);
      setUsers(response.getAllUsers);
      setPagination(response.pagination);
      return response;
    } catch (error) {
      showError(error.response?.data?.msg || "Failed to load users");
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  const resetFilters = () => {
    setSearch("");
    setRoleId("");
  };

  return {
    fetchUsers,
    users,
    errors,
    loading,
    search,
    setSearch,
    roleId,
    setRoleId,
    pagination,
    resetFilters,
  };
}
