import { useAuth } from "@/context/authContext";
import { Button } from "@/components/ui/button";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div>
      <h1>Employee Management</h1>
      <p>Authenticated: YES</p>
      <p>Email: {user?.email}</p>
      <Button onClick={handleLogout} variant="destructive">
        Logout
      </Button>
    </div>
  );
}

export default Dashboard;
