import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

function FormField() {
  return (
    <>
      {/* Personal Information */}
      <section className="rounded-xl border bg-background p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold">Personal Information</h2>

          <p className="text-sm text-muted-foreground">
            Basic information about the employee.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="firstName">First Name</Label>
            <Input id="firstName" name="firstName" placeholder="John" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="lastName">Last Name</Label>
            <Input id="lastName" name="lastName" placeholder="Doe" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="email">Email</Label>
            <Input
              id="email"
              name="email"
              type="email"
              placeholder="john@company.com"
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input id="phone" name="phone" placeholder="+62 812..." />
          </div>

          <div className="space-y-2">
            <Label htmlFor="dateOfBirth">Date of Birth</Label>
            <Input id="dateOfBirth" name="dateOfBirth" type="date" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>

            <select
              id="gender"
              name="gender"
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
        </div>
      </section>

      {/* Employment Information */}
      <section className="rounded-xl border bg-background p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold">Employment Information</h2>

          <p className="text-sm text-muted-foreground">
            Assign the employee to their organizational position.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="employeeId">Employee ID</Label>
            <Input id="employeeId" name="employeeId" placeholder="EMP-001" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="department">Department</Label>

            <select
              id="department"
              name="department"
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="">Select department</option>
              <option value="engineering">Engineering</option>
              <option value="human-resources">Human Resources</option>
              <option value="finance">Finance</option>
              <option value="marketing">Marketing</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="position">Position</Label>

            <select
              id="position"
              name="position"
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="">Select position</option>
              <option value="frontend-developer">Frontend Developer</option>
              <option value="backend-developer">Backend Developer</option>
              <option value="hr-specialist">HR Specialist</option>
              <option value="accountant">Accountant</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="jobLevel">Job Level</Label>

            <select
              id="jobLevel"
              name="jobLevel"
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="">Select job level</option>
              <option value="junior">Junior</option>
              <option value="mid">Mid</option>
              <option value="senior">Senior</option>
            </select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="joinDate">Join Date</Label>
            <Input id="joinDate" name="joinDate" type="date" />
          </div>

          <div className="space-y-2">
            <Label htmlFor="status">Employment Status</Label>

            <select
              id="status"
              name="status"
              defaultValue="active"
              className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
            >
              <option value="active">Active</option>
              <option value="inactive">Inactive</option>
            </select>
          </div>
        </div>
      </section>

      {/* Account Information */}
      <div>
        <section className="rounded-xl border bg-background p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold">Account Information</h2>

            <p className="text-sm text-muted-foreground">
              Configure the employee's system account.
            </p>
          </div>

          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="role">Role</Label>

              <select
                id="role"
                name="role"
                defaultValue="employee"
                className="h-9 w-full rounded-md border border-input bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-3 focus-visible:ring-ring/50"
              >
                <option value="employee">Employee</option>
                <option value="manager">Manager</option>
                <option value="hr">HR</option>
                <option value="admin">Admin</option>
              </select>
            </div>

            <div />

            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="password"
                placeholder="••••••••"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="confirmPassword">Confirm Password</Label>
              <Input
                id="confirmPassword"
                name="confirmPassword"
                type="password"
                placeholder="••••••••"
              />
            </div>
          </div>
        </section>
        {/* Actions */}
        <div className="flex justify-end gap-3 pt-6">
          <Button
            type="button"
            variant="outline"
            className="cursor-pointer"
            onClick={() => navigate("/employees")}
          >
            Cancel
          </Button>

          <Button type="submit" className="cursor-pointer">
            Create Employee
          </Button>
        </div>
      </div>
    </>
  );
}

export default FormField;
