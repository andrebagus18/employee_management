import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { usePositions } from "@/hooks/usePositions";
import { useDepartments } from "@/hooks/useDepartments";
import { useJobLevels } from "@/hooks/useJobLevels";
import { useRoles } from "@/hooks/useRoles";

function FormField({ form, error, handleChange, employees }) {
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
            <Select
              value={String(form.gender)}
              onValueChange={(value) =>
                handleChange({
                  target: {
                    name: "gender",
                    value,
                  },
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Gender" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="MALE">Male</SelectItem>
                <SelectItem value="FEMALE">Female</SelectItem>
              </SelectContent>
            </Select>
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
            <Select
              value={String(form.status)}
              onValueChange={(value) =>
                handleChange({
                  target: {
                    name: "status",
                    value,
                  },
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Status" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="ACTIVE">Active</SelectItem>
                <SelectItem value="INACTIVE">Inactive</SelectItem>
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="departmentId">Department</Label>
            <Select
              value={String(form.departmentId)}
              onValueChange={(value) =>
                handleChange({
                  target: {
                    name: "departmentId",
                    value,
                  },
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent className="max-h-50">
                {departments.map((department) => (
                  <SelectItem key={department.id} value={String(department.id)}>
                    {department.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="positionId">Position</Label>
            <Select
              value={String(form.positionId)}
              onValueChange={(value) =>
                handleChange({
                  target: {
                    name: "positionId",
                    value,
                  },
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Position" />
              </SelectTrigger>
              <SelectContent className="max-h-50">
                {positions.map((position) => (
                  <SelectItem key={position.id} value={String(position.id)}>
                    {position.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="jobLevelId">Job Level</Label>
            <Select
              value={String(form.jobLevelId)}
              onValueChange={(value) =>
                handleChange({
                  target: {
                    name: "jobLevelId",
                    value,
                  },
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Department" />
              </SelectTrigger>
              <SelectContent className="max-h-50">
                {jobLevels.map((jobLevel) => (
                  <SelectItem key={jobLevel.id} value={String(jobLevel.id)}>
                    {jobLevel.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>
          <div className="space-y-2">
            <Label htmlFor="managerId">Direct Manager</Label>
            <Select
              value={String(form.managerId)}
              onValueChange={(value) =>
                handleChange({
                  target: {
                    name: "managerId",
                    value,
                  },
                })
              }
            >
              <SelectTrigger className="w-full">
                <SelectValue placeholder="Select Manager" />
              </SelectTrigger>
              <SelectContent className="max-h-50">
                {employees.map((employee) => (
                  <SelectItem key={employee.id} value={employee.id}>
                    {employee.name}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
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
              <Select
                value={String(form.roleId)}
                onValueChange={(value) =>
                  handleChange({
                    target: {
                      name: "roleId",
                      value,
                    },
                  })
                }
              >
                <SelectTrigger className="w-full">
                  <SelectValue placeholder="Select Role" />
                </SelectTrigger>
                <SelectContent className="max-h-50">
                  {roles.map((role) => (
                    <SelectItem key={role.id} value={String(role.id)}>
                      {role.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </section>
      </div>
    </>
  );
}

export default FormField;
