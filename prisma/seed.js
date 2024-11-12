const { PrismaClient } = require("@prisma/client");
const prisma = new PrismaClient();

async function main() {
  const categories = ["Sofa", "Chair", "Table", "Bed", "Cabinet"];
  for (const name of categories) {
    await prisma.categories.upsert({
      where: { name },
      update: {},
      create: { name },
    });
  }

  console.log("Database seeded with initial categories.");
}

main()
  .catch((e) => console.error(e))
  .finally(async () => {
    await prisma.$disconnect();
  });
