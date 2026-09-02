import { useEmployees } from "@/hooks/useEmployees";
import { useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { ArrowLeft } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Badge } from "@/components/ui/badge";
import ItemDetail from "@/molecules/ItemDetail";
import { formatDateIndo } from "@/lib/utils";

function EmployeeDetail({ label, value }) {
  const navigate = useNavigate();
  const { id } = useParams();
  const { getEmployeeId, employee, loading } = useEmployees();
  useEffect(() => {
    getEmployeeId(id);
  }, [id]);
  // useEffect(() => {
  //   console.log("url id", id);
  //   console.log("employee detail", employee);
  // }, [employee, id]);
  if (loading) {
    return <div>Loading...</div>;
  }
  if (!employee) {
    return (
      <div className="space-y-2">
        <p className="text-md text-destructive">Employee not found</p>
        <Button onClick={() => navigate("/employees")}>Back to employee</Button>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {/* Header */}
      <div className="flex items-center gap-4">
        <Button
          variant="outline"
          size="icon"
          onClick={() => navigate("/employees")}
          className="cursor-pointer"
        >
          <ArrowLeft />
        </Button>

        <div>
          <h1 className="text-2xl font-semibold">Employee Detail</h1>
          <p className="text-sm text-muted-foreground">
            View employee information
          </p>
        </div>
      </div>

      {/* Profile */}
      <Card>
        <CardContent className="flex items-center justify-between p-6">
          <div>
            <h2 className="text-xl font-semibold">{employee.name}</h2>
            <p className="text-sm text-muted-foreground">
              {employee.position?.name}
            </p>
            <p className="text-sm text-muted-foreground">
              {employee.department?.name}
            </p>
          </div>
          <Badge>{employee.status}</Badge>
        </CardContent>
      </Card>

      {/* Personal Information */}
      <Card>
        <CardHeader>
          <CardTitle>Personal Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <ItemDetail label="Full Name" value={employee.name} />
          <ItemDetail label="Gender" value={employee.gender} />
          <ItemDetail label="NIK" value={employee.nik} />
          <ItemDetail label="Phone" value={employee.phone} />
          <ItemDetail label="Place of Birth" value={employee.place_birth} />
          <ItemDetail
            label="Date of Birth"
            value={formatDateIndo(employee.birth_date)}
          />
          <ItemDetail label="Address" value={employee.address} />
        </CardContent>
      </Card>

      {/* Employment Information */}
      <Card>
        <CardHeader>
          <CardTitle>Employment Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <ItemDetail label="Department" value={employee.department?.name} />
          <ItemDetail label="Position" value={employee.position?.name} />
          <ItemDetail label="Job Level" value={employee.jobLevel?.name} />
          <ItemDetail
            label="Direct Manager"
            value={employee.manager?.name || "-"}
          />
          <ItemDetail
            label="Hire Date"
            value={formatDateIndo(employee.hire_date)}
          />
          <ItemDetail
            label="Termination Date"
            value={formatDateIndo(employee.termination_date) || "-"}
          />
        </CardContent>
      </Card>

      {/* Account */}
      <Card>
        <CardHeader>
          <CardTitle>Account Information</CardTitle>
        </CardHeader>
        <CardContent className="grid gap-4 md:grid-cols-2">
          <ItemDetail label="Email" value={employee.users?.[0]?.email} />
          <ItemDetail label="Role" value={employee.users?.[0]?.role?.name} />
        </CardContent>
      </Card>
    </div>
  );
}

export default EmployeeDetail;
