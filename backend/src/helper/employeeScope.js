import { prisma } from "../lib/prisma.js";

export const getEmployeeScope = async (employeeId) => {
  // ambil managerId atau role manager
  const scope = await prisma.employee.findMany({
    where: {
      managerId: employeeId,
    },
    include: {
      other_employee: {
        include: {
          other_employee: true,
        },
      },
    },
  });

  // console.log("managers:", managers);
  // ambil pisahkan manager dengan spv
  const AllSubManagers = [];
  scope.forEach((mng) => {
    AllSubManagers.push(...mng.other_employee);
  });
  // console.log("manager:", AllSubManagers);
  // ambil spv dan pisahkan dengan bawahannya
  const allSubEmployee = [];
  AllSubManagers.forEach((spv) => {
    allSubEmployee.push(...spv.other_employee);
  });
  // console.log("spv", allSubEmployee);

  //mencari ID
  const employeeIds = allSubEmployee.map((emp) => emp.id);
  // console.log("employeeIds:", employeeIds);
  const spvIds = AllSubManagers.map((spv) => spv.id);
  // console.log("spvIds:", spvIds);
  const mngIds = scope.map((mng) => mng.id);
  // console.log("mngIds:", mngIds);
  const allIds = [];
  allIds.push(...employeeIds, ...spvIds, ...mngIds);
  // console.log("allIds:", allIds);
  return { allIds, mngIds };
};
