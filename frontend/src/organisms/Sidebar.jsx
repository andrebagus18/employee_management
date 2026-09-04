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
    `w-full flex h-8 text-black items-center gap-2 rounded-md px-2.5 py-3 hover:bg-slate-600/10 hover:text-black ${isActive ? "bg-slate-600 text-white" : "bg-transparent "}`;

  return (
    <aside className="flex min-h-screen w-64 flex-col border-r border-slate-300/40 bg-background">
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
          <CollapsibleTrigger className="group w-full flex justify-between h-8 hover:bg-slate-600/10">
            <div className="group/button inline-flex shrink-0 items-center justify-start gap-1.5 rounded-lg border border-transparent bg-transparent px-2.5 text-md whitespace-nowrap transition-all outline-none select-none hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <Building2 className="size-4 shrink-0" />
              Organization
            </div>
            <ChevronDown className="size-4 transition-transform duration-200 group-data-[panel-open]:rotate-180 mt-1.5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pt-1 px-4">
            <NavLink to={"/departments"} className={navClass}>
              <Building2 className="size-4 shrink-0" />
              Departments
            </NavLink>
            <NavLink to={"/positions"} className={navClass}>
              <BriefcaseBusiness className="size-4 shrink-0" />
              Positions
            </NavLink>
            <NavLink to={"/job-levels"} className={navClass}>
              <Layers3 className="size-4 shrink-0" />
              Job Levels
            </NavLink>
          </CollapsibleContent>
        </Collapsible>
        <NavLink to={"/leave-requests"} className={navClass}>
          <CalendarDays className="size-4 shrink-0" />
          Leave Requests
        </NavLink>
        <Collapsible>
          <CollapsibleTrigger className="group w-full flex justify-between h-8 hover:bg-slate-600/10">
            <div className="group/button inline-flex shrink-0 items-center justify-start gap-1.5 rounded-lg border border-transparent bg-transparent px-2.5 text-md whitespace-nowrap transition-all outline-none select-none hover:text-foreground focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50">
              <Building2 className="size-4 shrink-0" />
              Access Controls
            </div>
            <ChevronDown className="size-4 transition-transform duration-200 group-data-[panel-open]:rotate-180 mt-1.5" />
          </CollapsibleTrigger>
          <CollapsibleContent className="space-y-1 pt-1 px-4">
            <NavLink to={"/users"} className={navClass}>
              <Users2 className="size-4 shrink-0" />
              Users
            </NavLink>
            <NavLink to={"/roles"} className={navClass}>
              <ShieldCheck className="size-4 shrink-0" />
              Roles
            </NavLink>
            <NavLink to={"/permissions"} className={navClass}>
              <KeyRound className="size-4 shrink-0" />
              Permissions
            </NavLink>
          </CollapsibleContent>
        </Collapsible>
        <NavLink to={"/daily-reports"} className={navClass}>
          <FileText className="size-4 shrink-0" />
          Daily Reports
        </NavLink>
        <NavLink to={"/activity-logs"} className={navClass}>
          <Activity className="size-4 shrink-0" />
          Activity Logs
        </NavLink>
        <Button
          variant="destructive"
          className="w-full justify-start"
          onClick={onLogout}
        >
          <LogOut />
          Logout
        </Button>
      </nav>
    </aside>
  );
}

export default Sidebar;
