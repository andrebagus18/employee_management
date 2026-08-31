import { BrowserRouter, Routes, Route } from "react-router-dom";
import ProtectedRoute from "./ProtectedRoute";
import LoginPage from "@/pages/LoginPage";
import Dashboard from "@/pages/Dashboard";
import MainLayout from "@/layouts/MainLayout";
import Employees from "@/pages/Employees";
import CreateEmployee from "@/pages/CreateEmployee";
import Departments from "@/pages/Departments";
import Positions from "@/pages/Positions";
import JobLevels from "@/pages/JobLevels";

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
            <Route path="/employees/create" element={<CreateEmployee />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/job-levels" element={<JobLevels />} />
            <Route path="/leave-requests" element={<div>leave-requests</div>} />
            <Route path="/users" element={<div>users</div>} />
            <Route path="/roles" element={<div>roles</div>} />
            <Route path="/permissions" element={<div>permissions</div>} />
            <Route path="/daily-reports" element={<div>daily-reports</div>} />
            <Route path="/activity-logs" element={<div>activity-logs</div>} />
            <Route path="/setting" element={<div>setting</div>} />
          </Route>
        </Route>
        <Route path="/employee" element={<div>Employee</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
