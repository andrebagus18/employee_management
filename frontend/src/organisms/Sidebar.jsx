import {
  LayoutDashboard,
  Users,
  Building2,
  CalendarDays,
  FileText,
  Activity,
  ShieldCheck,
  Settings,
  LogOut,
  ChevronDown,
  BriefcaseBusiness,
  Layers3,
  Users2,
  KeyRound,
} from "lucide-react";
import { NavLink } from "react-router-dom";
import { Button } from "@/components/ui/button";
import {
  Collapsible,
  CollapsibleContent,
  CollapsibleTrigger,
} from "@/components/ui/collapsible";

function Sidebar({ onLogout }) {
  const navClass = ({ isActive }) =>
    `w-full flex h-8 text-black items-center justify-start gap-2 rounded-md px-2.5 py-3 hover:bg-slate-600/10 hover:text-black ${isActive ? "bg-slate-600 text-white" : "bg-transparent "}`;

  return (
    <aside className="flex h-screen w-64 flex-col border-r border-slate-300/40 bg-background">
      {/* Logo */}
      <div className="flex flex-col gap-4 h-24 items-center px-4 py-6">
        <h1 className="text-lg font-semibold">Employee Management</h1>
        <hr className="w-full h-2 mt-4 border-slate-300" />
      </div>
      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        <NavLink to="/dashboard" className={navClass}>
          <LayoutDashboard className="size-4 shrink-0" />
          Dashboard
        </NavLink>
        <NavLink to="/employees" className={navClass}>
          <Users className="size-4 shrink-0" />
          Employees
        </NavLink>
        <Collapsible>
          <CollapsibleTrigger
            className={`w-full flex justify-between h-8 hover:bg-slate-600/10 ${navClass}`}
          >
            <div className="group/button inline-flex shrink-0 items-center justify-start gap-1.5 rounded-lg border border-transparent bg-transparent px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <Building2 className="size-4" />
              Organization
            </div>
            <ChevronDown className="size-4 transition-transform duration-200 data-panel-open:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pt-1 px-4">
            <Button
              variant="ghost"
              className={`w-full justify-start bg-transparent hover:bg-slate-600/10 ${navClass}`}
            >
              <Building2 />
              Departments
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start bg-transparent hover:bg-slate-600/10 ${navClass}`}
            >
              <BriefcaseBusiness />
              Positions
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start bg-transparent hover:bg-slate-600/10 ${navClass}`}
            >
              <Layers3 />
              Job Levels
            </Button>
          </CollapsibleContent>
        </Collapsible>
        <NavLink className={navClass}>
          <CalendarDays className="size-4 shrink-0" />
          Leave Requests
        </NavLink>
        <Collapsible>
          <CollapsibleTrigger
            className={`w-full flex justify-between h-8 hover:bg-slate-600/10 ${navClass}`}
          >
            <div className="group/button inline-flex shrink-0 items-center justify-start gap-1.5 rounded-lg border border-transparent bg-transparent px-2.5 text-sm font-medium whitespace-nowrap transition-all outline-none select-none hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <Building2 className="size-4" />
              Access Controls
            </div>
            <ChevronDown className="size-4 transition-transform duration-200 data-panel-open:rotate-180" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pt-1 px-4">
            <Button
              variant="ghost"
              className={`w-full justify-start bg-transparent hover:bg-slate-600/10 ${navClass}`}
            >
              <Users2 />
              Users
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start bg-transparent hover:bg-slate-600/10 ${navClass}`}
            >
              <ShieldCheck />
              Roles
            </Button>
            <Button
              variant="ghost"
              className={`w-full justify-start bg-transparent hover:bg-slate-600/10 ${navClass}`}
            >
              <KeyRound />
              Permissions
            </Button>
          </CollapsibleContent>
        </Collapsible>
        <NavLink className={navClass}>
          <FileText className="size-4 shrink-0" />
          Daily Reports
        </NavLink>
        <NavLink className={navClass}>
          <Activity className="size-4 shrink-0" />
          Activity Logs
        </NavLink>
      </nav>
      {/* Bottom */}
      <div className="space-y-1 border-t p-4 pb-8">
        <NavLink className={navClass}>
          <Settings className="aize-4 shrink-0" />
          Setting
        </NavLink>
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
