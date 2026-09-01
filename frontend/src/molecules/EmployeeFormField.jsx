import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { usePositions } from "@/hooks/usePositions";
import { useDepartments } from "@/hooks/useDepartments";
import { useJobLevels } from "@/hooks/useJobLevels";
import { useRoles } from "@/hooks/useRoles";

function FormField({ form, error, handleChange }) {
  const { positions } = usePositions();
  const { departments } = useDepartments();
  const { jobLevels } = useJobLevels();
  const { roles } = useRoles();
  return (
    <>
      {/* Personal Information */}
      <section className="rounded-xl border border-slate-400/40 bg-background p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold">Personal Information</h2>

          <p className="text-sm text-muted-foreground">
            Basic information about the employee.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="name">Name</Label>
            <Input
              id="name"
              name="name"
              type="text"
              value={form.name}
              onChange={handleChange}
              placeholder="John"
              className="border border-slate-400/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="gender">Gender</Label>
            <select
              id="gender"
              name="gender"
              value={form.gender}
              onChange={handleChange}
              className="h-9 w-full rounded-md border border-slate-400/50 bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            >
              <option value="">Select gender</option>
              <option value="male">Male</option>
              <option value="female">Female</option>
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              className="border border-slate-400/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Input
              id="address"
              name="address"
              type="text"
              value={form.address}
              onChange={handleChange}
              className="border border-slate-400/50"
            />
          </div>
        </div>
      </section>

      {/* Employment Information */}
      <section className="rounded-xl border border-slate-400/40 bg-background p-6">
        <div className="mb-6">
          <h2 className="text-base font-semibold">Employment Information</h2>
          <p className="text-sm text-muted-foreground">
            Assign the employee to their organizational position.
          </p>
        </div>

        <div className="grid gap-5 md:grid-cols-2">
          <div className="space-y-2">
            <Label htmlFor="nik">NIK</Label>
            <Input
              id="nik"
              name="nik"
              value={form.nik}
              onChange={handleChange}
              placeholder="HRMS0001"
              className="border border-slate-400/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="hire_date">Hire Date</Label>
            <Input
              id="hire_date"
              name="hire_date"
              type="date"
              value={form.hire_date}
              onChange={handleChange}
              className="border border-slate-400/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="termination_date">Termination Date</Label>
            <Input
              id="termination_date"
              name="termination_date"
              type="date"
              value={form.termination_date}
              onChange={handleChange}
              className="border border-slate-400/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="status">Status</Label>
            <Input
              id="status"
              name="status"
              type="text"
              value={form.status}
              onChange={handleChange}
              className="border border-slate-400/50"
            />
          </div>
          <div className="space-y-2">
            <Label htmlFor="departmentId">Department</Label>
            <select
              id="departmentId"
              name="departmentId"
              value={form.departmentId}
              onChange={handleChange}
              className="h-9 w-full rounded-md border border-slate-400/40 bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            >
              {departments.map((department) => (
                <option key={department.id} value={department.id}>
                  {department.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="positionId">Position</Label>
            <select
              id="positionId"
              name="positionId"
              value={form.positionId}
              onChange={handleChange}
              className="h-9 w-full rounded-md border border-slate-400/40 bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            >
              {positions.map((position) => (
                <option key={position.id} value={position.id}>
                  {position.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobLevelId">Job Level</Label>
            <select
              id="jobLevelId"
              name="jobLevelId"
              value={form.jobLevelId}
              onChange={handleChange}
              className="h-9 w-full rounded-md border border-slate-400/40 bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            >
              {jobLevels.map((jobLevel) => (
                <option key={jobLevel.id} value={jobLevel.id}>
                  {jobLevel.name}
                </option>
              ))}
            </select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="managerId">Direct Manager</Label>
            <select
              id="managerId"
              name="managerId"
              value={form.managerId}
              onChange={handleChange}
              className="h-9 w-full rounded-md border border-slate-400/40 bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
            >
              <option value="">Select Manager</option>
              <option value="2">HR</option>
              <option value="3">Manager</option>
              <option value="4">Supervisor</option>
            </select>
          </div>
        </div>
      </section>

      {/* Account Information */}
      <div>
        <section className="rounded-xl border border-slate-400/40 bg-background p-6">
          <div className="mb-6">
            <h2 className="text-base font-semibold">Account Information</h2>
            <p className="text-sm text-muted-foreground">
              Configure the employee's system account.
            </p>
          </div>
          <div className="grid gap-5 md:grid-cols-2">
            <div className="space-y-2">
              <Label htmlFor="email">Email</Label>
              <Input
                id="email"
                name="email"
                type="mail"
                value={form.email}
                onChange={handleChange}
                className="border border-slate-400/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="password">Password</Label>
              <Input
                id="password"
                name="password"
                type="text"
                value={form.password}
                onChange={handleChange}
                className="border border-slate-400/50"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="roleId">Role</Label>
              <select
                id="roleId"
                name="roleId"
                value={form.roleId}
                onChange={handleChange}
                className="h-9 w-full rounded-md border border-slate-400/40 bg-background px-3 text-sm shadow-xs outline-none focus-visible:border-ring focus-visible:ring-2 focus-visible:ring-ring/30"
              >
                {roles.map((role) => (
                  <option key={role.id} value={role.id}>
                    {role.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default FormField;
