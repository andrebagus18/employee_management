import { useAuth } from "@/context/authContext";
import {
  Users,
  Building2,
  CalendarDays,
  Clock3,
  UserPlus,
  FileCheck,
} from "lucide-react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import StatisticCard from "@/molecules/StatisticCard";
import { useNavigate } from "react-router-dom";

function Dashboard() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const handleLogout = async () => {
    await logout();
    navigate("/login");
  };

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-2xl font-semibold tracking-tight">
          Welcome back, {user?.employee?.name}! 👋
        </h1>
      </div>
      {/* statistic */}
      <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
        <StatisticCard
          icon={Users}
          title="Total Employees"
          value="125"
          description="Active employees"
        />
        <StatisticCard
          icon={Building2}
          title="Departments"
          value="10"
          description="Active departments"
        />
        <StatisticCard
          icon={CalendarDays}
          title="On Leave"
          value="12"
          description="Employees on leave"
        />
        <StatisticCard
          icon={Clock3}
          title="Pending Requests"
          value="5"
          description="Need your attention"
        />
      </div>
      {/* Bottom section */}
      <div className="grid gap-4 lg:grid-cols-2">
        <Card>
          <CardHeader>
            <CardTitle>Recent Activity</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center gap-3">
              <UserPlus className="size-4 text-muted-foreground" />

              <div>
                <p className="text-sm font-medium">New employee added</p>

                <p className="text-xs text-muted-foreground">
                  John Doe was added to Engineering
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <FileCheck className="size-4 text-muted-foreground" />

              <div>
                <p className="text-sm font-medium">Leave request approved</p>

                <p className="text-xs text-muted-foreground">
                  Sarah's annual leave was approved
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <Users className="size-4 text-muted-foreground" />

              <div>
                <p className="text-sm font-medium">Employee updated</p>

                <p className="text-xs text-muted-foreground">
                  Michael's position was updated
                </p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Pending Leave */}
        <Card>
          <CardHeader>
            <CardTitle>Pending Leave Requests</CardTitle>
          </CardHeader>

          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">John Doe</p>
                <p className="text-xs text-muted-foreground">Annual Leave</p>
              </div>

              <span className="text-xs text-muted-foreground">2 days</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Sarah Smith</p>
                <p className="text-xs text-muted-foreground">Sick Leave</p>
              </div>

              <span className="text-xs text-muted-foreground">1 day</span>
            </div>

            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium">Michael Lee</p>
                <p className="text-xs text-muted-foreground">Annual Leave</p>
              </div>

              <span className="text-xs text-muted-foreground">3 days</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}

export default Dashboard;
