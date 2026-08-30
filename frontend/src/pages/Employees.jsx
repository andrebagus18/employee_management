import { useState } from "react";
import { Search } from "lucide-react";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { MoreHorizontal } from "lucide-react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";

import { Badge } from "@/components/ui/badge";

function Employees() {
  const [search, setSearch] = useState("");
  const [department, setDepartment] = useState("all");
  const [jobLevel, setJobLevel] = useState("all");
  const [status, setStatus] = useState("all");
  const employees = [
    {
      id: 1,
      name: "John Doe",
      email: "john@company.com",
      department: "Engineering",
      position: "Frontend Developer",
      jobLevel: "Senior",
      status: "Active",
    },
    {
      id: 2,
      name: "Sarah Smith",
      email: "sarah@company.com",
      department: "Human Resources",
      position: "HR Specialist",
      jobLevel: "Mid",
      status: "Active",
    },
    {
      id: 3,
      name: "Michael Lee",
      email: "michael@company.com",
      department: "Finance",
      position: "Accountant",
      jobLevel: "Junior",
      status: "Inactive",
    },
    {
      id: 4,
      name: "Emily Johnson",
      email: "emily@company.com",
      department: "Engineering",
      position: "Backend Developer",
      jobLevel: "Mid",
      status: "Active",
    },
  ];

  return (
    <div className="space-y-6">
      {/* Header */}
      <div>
        <h1 className="text-2xl font-semibold">Employees</h1>
        <p className="text-muted-foreground">
          Manage your organization's employees.
        </p>
      </div>

      {/* Filters */}
      <div className="flex flex-col gap-3 md:flex-row">
        {/* Search */}
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 size-4 -translate-y-1/2 text-muted-foreground" />

          <Input
            placeholder="Search employees..."
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            className="pl-9"
          />
        </div>

        {/* Table */}
        <div className="rounded-lg border">
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Name</TableHead>
                <TableHead>Department</TableHead>
                <TableHead>Position</TableHead>
                <TableHead>Job Level</TableHead>
                <TableHead>Status</TableHead>
                <TableHead className="w-[50px]"></TableHead>
              </TableRow>
            </TableHeader>

            <TableBody>
              {employees.map((employee) => (
                <TableRow key={employee.id}>
                  <TableCell>
                    <div>
                      <p className="font-medium">{employee.name}</p>
                      <p className="text-sm text-muted-foreground">
                        {employee.email}
                      </p>
                    </div>
                  </TableCell>

                  <TableCell>{employee.department}</TableCell>

                  <TableCell>{employee.position}</TableCell>

                  <TableCell>{employee.jobLevel}</TableCell>

                  <TableCell>
                    <Badge
                      variant={
                        employee.status === "Active" ? "default" : "secondary"
                      }
                    >
                      {employee.status}
                    </Badge>
                  </TableCell>

                  <TableCell>
                    <Button variant="ghost" size="icon">
                      <MoreHorizontal />
                    </Button>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        </div>

        {/* Department */}
        <select
          value={department}
          onChange={(e) => setDepartment(e.target.value)}
          className="h-9 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="all">All Departments</option>
          <option value="engineering">Engineering</option>
          <option value="hr">Human Resources</option>
          <option value="finance">Finance</option>
        </select>

        {/* Job Level */}
        <select
          value={jobLevel}
          onChange={(e) => setJobLevel(e.target.value)}
          className="h-9 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="all">All Job Levels</option>
          <option value="junior">Junior</option>
          <option value="mid">Mid</option>
          <option value="senior">Senior</option>
        </select>

        {/* Status */}
        <select
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          className="h-9 rounded-lg border bg-background px-3 text-sm"
        >
          <option value="all">All Status</option>
          <option value="active">Active</option>
          <option value="inactive">Inactive</option>
        </select>
      </div>

      {/* Table kita biarkan di bawah */}
    </div>
  );
}

export default Employees;
