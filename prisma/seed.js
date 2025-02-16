const { PrismaClient } = require("@prisma/client");
const ROLES_LIST = require("../config/roles_list");
const prisma = new PrismaClient();

async function main() {
  await prisma.user.create({
    data: {
      email: "admin@admin.com",
      name: "Admin",
      password: "$2a$10$Y7CADCl53Q3zqgEPnE4YRuMeooE0NpF5NpiK7nRh9tx5IyC2aGTMO", //  password: "password"
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
