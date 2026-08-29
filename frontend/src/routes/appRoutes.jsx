import { BrowserRouter, Routes, Route } from "react-router-dom";
import LoginPage from "@/pages/LoginPage";

function AppRoutes() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/" element={<div>Home</div>} />
        <Route path="/login" element={<LoginPage />} />
        <Route path="/dashboard" element={<div>Dashboard</div>} />
        <Route path="/employee" element={<div>Employee</div>} />
      </Routes>
    </BrowserRouter>
  );
}

export default AppRoutes;
