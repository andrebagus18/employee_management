import { prisma } from "./lib/prisma.js";

async function main() {
  const departments = await prisma.department.findMany();
  console.log(departments);
}
main()
  .catch((error) => {
    console.error(error);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
