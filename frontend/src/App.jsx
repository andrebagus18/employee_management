import AppRoutes from "@/routes/appRoutes";
import { useAuth } from "./context/authContext";

function App() {
  const { user, loading, isAuthenticated } = useAuth();
  if (loading) {
    return <div>Loading...</div>;
  }
  return (
    <div>
      <h1>Employee Management</h1>
      <p>Authenticated: {isAuthenticated ? "YES" : "NO"}</p>
      {user && <pre>{JSON.stringify(user, null, 2)}</pre>}
    </div>
  );
}

export default App;
