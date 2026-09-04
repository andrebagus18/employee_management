import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../context/authContext";
import { LoaderCircle } from "lucide-react";

function ProtectedRoute({ children }) {
  const { loading, isAuthenticated } = useAuth();
  if (loading) {
    return (
      <div className="flex flex-col min-h-screen items-center justify-center mt-10">
        <LoaderCircle className="size-10 animate-spin" />
        <p className="text-md font-normal text-slate-300 mt-2">
          Please wait...
        </p>
      </div>
    );
  }
  if (!isAuthenticated) {
    return <Navigate to="/login" replace />;
  }
  return <Outlet />;
}

export default ProtectedRoute;
