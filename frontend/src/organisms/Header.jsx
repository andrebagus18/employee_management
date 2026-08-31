import { Bell } from "lucide-react";
import { Avatar, AvatarFallback } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { useAuth } from "@/context/authContext";
import { useLocation } from "react-router-dom";

function Header() {
  const location = useLocation();
  const titles = {
    "/dashboard": "Dashboard",
    "/employees": "Employees",
    "/departments": "Departments",
    "/positions": "Positions",
    "/job-levels": "Job Levels",
    "/leave-requests": "Leave Requests",
    "/daily-reports": "Daily Reports",
    "/activity-logs": "Activity Logs",
    "/roles": "Roles",
    "/permissions": "Permissions",
    "/users": "Users",
    "/settings": "Settings",
  };
  const title = titles[location.pathname] ?? "Employee Management";
  const { user } = useAuth();

  return (
    <header className="flex h-16 items-center justify-between border-b bg-background px-6 shadow-lg">
      <div>
        <h2 className="text-lg font-semibold">{title}</h2>
      </div>
      <div className="flex items-center gap-4">
        <Button variant="ghost" size="icon">
          <Bell />
        </Button>
        <div className="flex items-center gap-3">
          <Avatar>
            <AvatarFallback>
              {user?.email.charAt(0).toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div className="hidden text-sm sm:block">
            <p className="font-medium ">{user?.email}</p>
            <p className="text-xs text-muted-foreground">{user?.role?.name}</p>
          </div>
        </div>
      </div>
    </header>
  );
}

export default Header;
