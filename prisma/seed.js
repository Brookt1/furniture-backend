const { PrismaClient } = require("@prisma/client");
const ROLES_LIST = require("../config/roles_list");
const prisma = new PrismaClient();

async function main() {
  const categories = ["Sofa", "Chair", "Table", "Bed", "Cabinet"];
  for (const name of categories) {
    await prisma.category.create({
      data: {
        name,
      },
    });
  }

  // Add initial data here
  await prisma.user.create({
    data: {
      email: "admin@example.com",
      name: "Admin",
      password: "password",
      role: ROLES_LIST.SuperAdmin,
    },
  });

  // Add more initial data as needed

  console.log("Database seeded with initial categories and user.");
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
