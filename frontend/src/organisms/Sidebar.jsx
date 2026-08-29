import {
  LayoutDashboard,
  Users,
  CalendarDays,
  FileText,
  Activity,
  Settings,
  LogOut,
} from "lucide-react";
import { Button } from "@/components/ui/button";

function Sidebar({ onLogout }) {
  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-300/40 bg-background">
      {/* Logo */}
      <div className="flex flex-col gap-4 h-24 items-center px-4 py-6">
        <h1 className="text-lg font-semibold">Employee Management</h1>
        <hr className="w-full h-2 mt-4 border-slate-300" />
      </div>
      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start bg-transparent hover:bg-slate-600/10"
        >
          <LayoutDashboard />
          Dashboard
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start bg-transparent hover:bg-slate-600/10"
        >
          <Users />
          Employees
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start bg-transparent hover:bg-slate-600/10"
        >
          <CalendarDays />
          Leave Requests
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start bg-transparent hover:bg-slate-600/10"
        >
          <FileText />
          Daily Reports
        </Button>
        <Button
          variant="ghost"
          className="w-full justify-start bg-transparent hover:bg-slate-600/10"
        >
          <Activity />
          Activity Logs
        </Button>
      </nav>
      {/* Bottom */}
      <div className="space-y-1 border-t p-4 pb-8">
        <Button
          variant="ghost"
          className="w-full justify-start bg-transparent hover:bg-slate-600/10"
        >
          <Settings />
          Setting
        </Button>
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={onLogout}
        >
          <LogOut />
          Logout
        </Button>
      </div>
    </aside>
  );
}

export default Sidebar;
