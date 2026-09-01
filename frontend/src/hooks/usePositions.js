import { getPositions } from "@/services/position.service";
import { useCallback, useState, useEffect } from "react";

export function usePositions() {
  const [positions, setPositions] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(false);

  const fetchPositions = useCallback(async () => {
    try {
      setLoading(true);
      const data = await getPositions();
      return setPositions(data.positions);
    } catch (error) {
      console.error(error);
      setError(error);
    } finally {
      setLoading(false);
    }
  });

  useEffect(() => {
    fetchPositions();
  }, [fetchPositions]);

  return {
    positions,
    loading,
  };
}
