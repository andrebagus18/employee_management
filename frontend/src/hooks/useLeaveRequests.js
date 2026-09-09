import { getLeaveRequests } from "@/services/leaveRequest.service";
import { showError, showSuccess } from "../lib/alert";
import { useCallback, useState, useEffect } from "react";

export function useLeaveRequests() {
  const [leaveRequests, setLeaveRequests] = useState([]);
  const [loading, setLoading] = useState(false);
  const [errors, setErrors] = useState({});
  const [open, setOpen] = useState(false);

  const fetchLeaveRequests = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getLeaveRequests();
      console.log("response:", data);
      return setLeaveRequests(data.leaveRequests);
    } catch (error) {
      showError(error);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchLeaveRequests();
  }, [fetchLeaveRequests]);

  return {
    fetchLeaveRequests,
    leaveRequests,
    loading,
    errors,
    open,
    setOpen,
  };
}
