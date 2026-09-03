import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { Textarea } from "@/components/ui/textarea";
import { usePositions } from "@/hooks/usePositions";
import { useDepartments } from "@/hooks/useDepartments";
import { useJobLevels } from "@/hooks/useJobLevels";
import { useRoles } from "@/hooks/useRoles";
import FormDate from "./FormDate";
import FormSelect from "./FormSelect";

function FormField({ form, errors, handleChange, employees }) {
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
            {errors.name && (
              <p className="font-sm text-destructive">{errors.name}</p>
            )}
          </div>
          <FormSelect
            label="Gender"
            name="gender"
            value={form.gender}
            onChange={handleChange}
            options={[
              { value: "MALE", label: "Male" },
              { value: "FEMALE", label: "Female" },
            ]}
            placehorder="Select gender"
            error={errors.gender}
          />
          <div className="space-y-2">
            <Label htmlFor="phone">Phone</Label>
            <Input
              id="phone"
              name="phone"
              type="tel"
              value={form.phone}
              onChange={handleChange}
              placeholder="0812..."
              className="border border-slate-400/50"
            />
            {errors.phone && (
              <p className="font-sm text-destructive">{errors.phone}</p>
            )}
          </div>
          <div className="space-y-2">
            <Label htmlFor="place_birth">Place of Birth</Label>
            <Input
              id="place_birth"
              name="place_birth"
              type="text"
              value={form.place_birth}
              onChange={handleChange}
              className="border border-slate-400/50"
            />
            {errors.place_birth && (
              <p className="font-sm text-destructive">{errors.place_birth}</p>
            )}
          </div>
          <FormDate
            label="Date of Birth"
            name="date_birth"
            value={form.date_birth}
            onChange={handleChange}
            error={errors.date_birth}
          />
          <div className="space-y-2">
            <Label htmlFor="address">Address</Label>
            <Textarea
              id="address"
              name="address"
              value={form.address}
              onChange={handleChange}
              className="min-h-24 resize-none"
            />
            {errors.address && (
              <p className="font-sm text-destructive">{errors.address}</p>
            )}
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
            {errors.nik && (
              <p className="font-sm text-destructive">{errors.nik}</p>
            )}
          </div>
          <FormDate
            label="Hire Date"
            name="hire_date"
            value={form.hire_date}
            onChange={handleChange}
            error={errors.hire_date}
          />
          <FormDate
            label="Termination Date"
            name="termination_date"
            value={form.termination_date}
            onChange={handleChange}
          />
          <FormSelect
            label="Status"
            name="status"
            value={form.status}
            onChange={handleChange}
            options={[
              { value: "ACTIVE", label: "Active" },
              { value: "INACTIVE", label: "Inactive" },
            ]}
            placehorder="Select status"
            error={errors.status}
          />
          <FormSelect
            label="Department"
            name="departmentId"
            value={form.departmentId}
            onChange={handleChange}
            options={departments.map((department) => ({
              value: department.id,
              label: department.name,
            }))}
            placehorder="Select Department"
            error={errors.departmentId}
          />
          <FormSelect
            label="Position"
            name="positionId"
            value={form.positionId}
            onChange={handleChange}
            options={positions.map((position) => ({
              value: position.id,
              label: position.name,
            }))}
            placehorder="Select Position"
            error={errors.positionId}
          />
          <FormSelect
            label="Job Level"
            name="jobLevelId"
            value={form.jobLevelId}
            onChange={handleChange}
            options={jobLevels.map((jobLevel) => ({
              value: jobLevel.id,
              label: jobLevel.name,
            }))}
            placehorder="Select Job Level"
            error={errors.jobLevelId}
          />
          <FormSelect
            label="Direct Manager"
            name="managerId"
            value={form.managerId}
            onChange={handleChange}
            options={employees.map((employee) => ({
              value: employee.id,
              label: employee.name,
            }))}
            placehorder="Select a top"
            error={errors.managerId}
          />
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
              {errors.email && (
                <p className="font-sm text-destructive">{errors.email}</p>
              )}
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
              {errors.password && (
                <p className="font-sm text-destructive">{errors.password}</p>
              )}
            </div>
            <FormSelect
              label="Role"
              name="roleId"
              value={form.roleId}
              onChange={handleChange}
              options={roles.map((role) => ({
                value: role.id,
                label: role.name,
              }))}
              placehorder="Select Role"
              error={errors.roleId}
            />
          </div>
        </section>
      </div>
    </>
  );
}

export default FormField;
