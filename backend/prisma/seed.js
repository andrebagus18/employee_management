import { prisma } from "../src/lib/prisma.js";
import bcrypt from "bcryptjs";

async function main() {
  // await prisma.jobLevel.createMany({
  //   data: [
  //     { name: "Staff" },
  //     { name: "Senior Staff" },
  //     { name: "Supervisor" },
  //     { name: "Assistant Manager" },
  //     { name: "Manager" },
  //     { name: "Senior Manager" },
  //     { name: "Head" },
  //     { name: "Director" },
  //   ],
  // });
  // await prisma.department.createMany({
  //   data: [
  //     { name: "Management" },
  //     { name: "IT" },
  //     { name: "HR" },
  //     { name: "Finance" },
  //     { name: "Accounting" },
  //     { name: "Marketing" },
  //     { name: "Sales" },
  //     { name: "Maintenance" },
  //     { name: "Production" },
  //     { name: "Customer Service" },
  //     { name: "Legal" },
  //     { name: "General Affairs" },
  //   ],
  // });
  // await prisma.role.createMany({
  //   data: [
  //     { name: "HR" },
  //     { name: "MANAGER" },
  //     { name: "SUPERVISOR" },
  //     { name: "EMPLOYEE" },
  //   ],
  // });
  // await prisma.permission.createMany({
  //   data: [
  //     { name: "employee.view", description: "View employees" },
  //     { name: "employee.create", description: "Create employee" },
  //     { name: "employee.update", description: "Update employee" },
  //     { name: "employee.delete", description: "Delete employee" },

  //     { name: "department.view", description: "View departments" },
  //     { name: "department.create", description: "Create department" },
  //     { name: "department.update", description: "Update department" },
  //     { name: "department.delete", description: "Delete department" },

  //     { name: "position.view", description: "View positions" },
  //     { name: "position.create", description: "Create position" },
  //     { name: "position.update", description: "Update position" },
  //     { name: "position.delete", description: "Delete position" },

  //     { name: "leave.view", description: "View leave requests" },
  //     { name: "leave.create", description: "Create leave request" },
  //     { name: "leave.approve", description: "Approve leave request" },
  //     { name: "leave.reject", description: "Reject leave request" },

  //     { name: "report.view", description: "View daily reports" },
  //     { name: "report.create", description: "Create daily report" },

  //     { name: "user.view", description: "View users" },
  //     { name: "user.create", description: "Create user" },
  //     { name: "user.update", description: "Update user" },
  //     { name: "user.delete", description: "Delete user" },

  //     { name: "role.view", description: "View roles" },
  //     { name: "role.create", description: "Create role" },
  //     { name: "role.update", description: "Update role" },
  //     { name: "role.delete", description: "Delete role" },
  //   ],
  // });

  // const mng = await prisma.department.findFirst({
  //   where: { name: "Management" },
  // });
  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "Director",
  //       departmentId: mng.id,
  //     },
  //     {
  //       name: "General Manager",
  //       departmentId: mng.id,
  //     },
  //     {
  //       name: "Operations Manager",
  //       departmentId: mng.id,
  //     },
  //     {
  //       name: "HR Manager",
  //       departmentId: mng.id,
  //     },
  //   ],
  // });

  // const it = await prisma.department.findFirst({
  //   where: { name: "IT" },
  // });

  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "IT Manager",
  //       departmentId: it.id,
  //     },
  //     {
  //       name: "IT Support",
  //       departmentId: it.id,
  //     },
  //     {
  //       name: "Network Engineer",
  //       departmentId: it.id,
  //     },
  //     {
  //       name: "System Administrator",
  //       departmentId: it.id,
  //     },
  //     {
  //       name: "Frontend Developer",
  //       departmentId: it.id,
  //     },
  //     {
  //       name: "Backend Developer",
  //       departmentId: it.id,
  //     },
  //     {
  //       name: "Fullstack Developer",
  //       departmentId: it.id,
  //     },
  //     {
  //       name: "Mobile Developer",
  //       departmentId: it.id,
  //     },
  //     {
  //       name: "UI/UX Designer",
  //       departmentId: it.id,
  //     },
  //     {
  //       name: "QA Engineer",
  //       departmentId: it.id,
  //     },
  //     {
  //       name: "DevOps Engineer",
  //       departmentId: it.id,
  //     },
  //   ],
  // });

  // const hr = await prisma.department.findFirst({
  //   where: { name: "HR" },
  // });
  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "HR Manager",
  //       departmentId: hr.id,
  //     },
  //     {
  //       name: "HR Generalist",
  //       departmentId: hr.id,
  //     },
  //     {
  //       name: "HR Staff",
  //       departmentId: hr.id,
  //     },
  //     {
  //       name: "Recruitment Specialist",
  //       departmentId: hr.id,
  //     },
  //     {
  //       name: "Payroll Specialist",
  //       departmentId: hr.id,
  //     },
  //     {
  //       name: "Training & Development Specialist",
  //       departmentId: hr.id,
  //     },
  //   ],
  // });

  // const fnc = await prisma.department.findFirst({
  //   where: { name: "Finance" },
  // });
  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "Finance Mnager",
  //       departmentId: fnc.id,
  //     },
  //     {
  //       name: "Finance Staff",
  //       departmentId: fnc.id,
  //     },
  //     {
  //       name: "Financial Analyst",
  //       departmentId: fnc.id,
  //     },
  //     {
  //       name: "Treasury Staff",
  //       departmentId: fnc.id,
  //     },
  //     {
  //       name: "Tax Specialist",
  //       departmentId: fnc.id,
  //     },
  //   ],
  // });

  // const acc = await prisma.department.findFirst({
  //   where: { name: "Accounting" },
  // });
  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "Accounting Manager",
  //       departmentId: acc.id,
  //     },
  //     {
  //       name: "Accountant",
  //       departmentId: acc.id,
  //     },
  //     {
  //       name: "Accounting Staff",
  //       departmentId: acc.id,
  //     },
  //     {
  //       name: "Accounts Payable Staff",
  //       departmentId: acc.id,
  //     },
  //     {
  //       name: "Accounts Receivable Staff",
  //       departmentId: acc.id,
  //     },
  //     {
  //       name: "Tax Accountant",
  //       departmentId: acc.id,
  //     },
  //   ],
  // });

  // const mkt = await prisma.department.findFirst({
  //   where: { name: "Marketing" },
  // });
  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "Marketing Manager",
  //       departmentId: mkt.id,
  //     },
  //     {
  //       name: "Marketing Staff",
  //       departmentId: mkt.id,
  //     },
  //     {
  //       name: "Digital Marketing Specialist",
  //       departmentId: mkt.id,
  //     },
  //     {
  //       name: "Content Specialist",
  //       departmentId: mkt.id,
  //     },
  //     {
  //       name: "Social Media Specialist",
  //       departmentId: mkt.id,
  //     },
  //     {
  //       name: "SEO Specialist",
  //       departmentId: mkt.id,
  //     },
  //     {
  //       name: "Brand Specialist",
  //       departmentId: mkt.id,
  //     },
  //   ],
  // });

  // const sls = await prisma.department.findFirst({
  //   where: { name: "Sales" },
  // });
  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "Sales Manager",
  //       departmentId: sls.id,
  //     },
  //     {
  //       name: "Sales Supervisor",
  //       departmentId: sls.id,
  //     },
  //     {
  //       name: "Sales Executive",
  //       departmentId: sls.id,
  //     },
  //     {
  //       name: "Sales Representative",
  //       departmentId: sls.id,
  //     },
  //     {
  //       name: "Account Executive",
  //       departmentId: sls.id,
  //     },
  //     {
  //       name: "Business Development Executive",
  //       departmentId: sls.id,
  //     },
  //   ],
  // });

  // const mnt = await prisma.department.findFirst({
  //   where: { name: "Maintenance" },
  // });
  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "MNT Manager",
  //       departmentId: mnt.id,
  //     },
  //     {
  //       name: "MNT Supervisor",
  //       departmentId: mnt.id,
  //     },
  //     {
  //       name: "MNT Staff",
  //       departmentId: mnt.id,
  //     },
  //     {
  //       name: "MNT Foreman",
  //       departmentId: mnt.id,
  //     },
  //     {
  //       name: "MNT Operator",
  //       departmentId: mnt.id,
  //     },
  //   ],
  // });

  // const prd = await prisma.department.findFirst({
  //   where: { name: "Production" },
  // });
  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "PRD Manager",
  //       departmentId: prd.id,
  //     },
  //     {
  //       name: "PRD Supervisor",
  //       departmentId: prd.id,
  //     },
  //     {
  //       name: "PRD Planner",
  //       departmentId: prd.id,
  //     },
  //     {
  //       name: "PRD Staff",
  //       departmentId: prd.id,
  //     },
  //     {
  //       name: "PRD Foreman",
  //       departmentId: prd.id,
  //     },
  //     {
  //       name: "PRD Operator",
  //       departmentId: prd.id,
  //     },
  //     {
  //       name: "PRD Quality Control",
  //       departmentId: prd.id,
  //     },
  //   ],
  // });

  // const lgl = await prisma.department.findFirst({
  //   where: { name: "Legal" },
  // });
  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "Legal Manager",
  //       departmentId: lgl.id,
  //     },
  //     {
  //       name: "Legal Specialist",
  //       departmentId: lgl.id,
  //     },
  //     {
  //       name: "Legal Staff",
  //       departmentId: lgl.id,
  //     },
  //   ],
  // });

  // const ga = await prisma.department.findFirst({
  //   where: { name: "General Affairs" },
  // });
  // await prisma.position.createMany({
  //   data: [
  //     {
  //       name: "GA Manager",
  //       departmentId: ga.id,
  //     },
  //     {
  //       name: "GA Supervisor",
  //       departmentId: ga.id,
  //     },
  //     {
  //       name: "GA Staff",
  //       departmentId: ga.id,
  //     },
  //     {
  //       name: "GA Security Coordinator",
  //       departmentId: ga.id,
  //     },
  //   ],
  // });

  const adminEmployee = await prisma.employee.create({
    data: {
      name: "Admin Andre",
      gender: "Male",
      nik: "ADM001",
      phone: "081122334455",
      address: "Mojokerto, Jawa Timur",
      hire_date: new Date("2026-08-22"),
      status: "active",
      department: {
        connect: {
          id: 2,
        },
      },
      position: {
        connect: {
          id: 8,
        },
      },
      jobLevel: {
        connect: {
          id: 5,
        },
      },
    },
  });
  console.log("Admin employee created:", adminEmployee);

  // const adminRole = await prisma.role.create({
  //   data: {
  //     name: "Administrator",
  //   },
  // });
  // console.log("Admin role created:", adminRole);

  const adminUser = await prisma.user.create({
    data: {
      email: "admin@gmail.com",
      password: await bcrypt.hash("admin123", 10),
      role: {
        connect: {
          id: 1,
        },
      },
      employee: {
        connect: {
          id: adminEmployee.id,
        },
      },
    },
  });
  console.log("Admin user created:", adminUser);
}
main()
  .catch(console.error())
  .finally(async () => {
    await prisma.$disconnect();
  });
