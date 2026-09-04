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
import LeaveRequests from "@/pages/LeaveRequests";
import Users from "@/pages/Users";
import Roles from "@/pages/Roles";
import Permissions from "@/pages/Permissions";
import DailyReports from "@/pages/DailyReports";
import ActivityLogs from "@/pages/ActivityLogs";
import EmployeeDetail from "@/pages/EmployeeDetail";
import EditEmployee from "@/pages/EditEmployee";
import EditDepartment from "../pages/EditDepartment";

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
            <Route path="/employees/:id" element={<EmployeeDetail />} />
            <Route path="/employees/:id/update" element={<EditEmployee />} />
            <Route path="/departments" element={<Departments />} />
            <Route path="/departments/:id/update" element={<Departments />} />
            <Route path="/positions" element={<Positions />} />
            <Route path="/job-levels" element={<JobLevels />} />
            <Route path="/leave-requests" element={<LeaveRequests />} />
            <Route path="/users" element={<Users />} />
            <Route path="/roles" element={<Roles />} />
            <Route path="/permissions" element={<Permissions />} />
            <Route path="/daily-reports" element={<DailyReports />} />
            <Route path="/activity-logs" element={<ActivityLogs />} />
            <Route path="/setting" element={<div>setting</div>} />
          </Route>
        </Route>
        <Route path="/employee" element={<div>Employee</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
