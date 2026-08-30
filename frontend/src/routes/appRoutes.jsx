import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import MainLayout from "@/layouts/MainLayout";
import Employees from "@/pages/Employees";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route element={<ProtectedRoute />}>
          <Route element={<MainLayout />}>
            <Route path="/dashboard" element={<Dashboard />} />
            <Route path="/employees" element={<Employees />} />
          </Route>
        </Route>
        <Route path="/employee" element={<div>Employee</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
