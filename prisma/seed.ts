import "dotenv/config";
import { prisma } from "../app.js";
import bcrypt from "bcrypt";

const users = [
  {
    id: 1,
    email: "jean@snack-etoile.fr",
    password_clair: "password123",
  },
  {
    id: 2,
    email: "marie@snack-soleil.fr",
    password_clair: "password123",
  },
];

const products = [
  {
    name: "Portion de frites",
    quantity: 25,
    UserId: 1,
  },
  {
    name: "Coca-Cola",
    quantity: 48,
    UserId: 1,
  },
  {
    name: "Sprite",
    quantity: 30,
    UserId: 1,
  },
  {
    name: "Chips",
    quantity: 50,
    UserId: 2,
  },
  {
    name: "Glace vanille",
    quantity: 15,
    UserId: 2,
  },
  {
    name: "Glace fraise",
    quantity: 20,
    UserId: 2,
  },
];

async function createUsers() {
  let hashedUsers = [];
  for (const user of users) {
    const hashedPassword = await bcrypt.hash(user.password_clair, 10);
    hashedUsers.push({
      id: user.id,
      email: user.email,
      password: hashedPassword,
    });
  }
  await prisma.user.createMany({
    data: hashedUsers,
    skipDuplicates: true,
  });
}

async function createProducts() {
  await prisma.product.createMany({
    data: products,
    skipDuplicates: true,
  });
}

async function main() {
  await createUsers();
  await createProducts();
}

main()
  .catch((error) => {
    console.error(error);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
