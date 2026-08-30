import { Outlet, useNavigate } from "react-router-dom";
import Sidebar from "@/organisms/Sidebar";
import Header from "@/organisms/Header";
import { useAuth } from "@/context/authContext";

function DashboardLayout() {
  const { logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="flex min-h-screen bg-muted/30">
      <Sidebar onLogout={handleLogout} />
      <div className="flex flex-col flex-1">
        <Header title="Dashboard" />
        <main className="flex-1 p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}

export default DashboardLayout;
