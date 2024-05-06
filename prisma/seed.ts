import { PrismaClient, User } from '@prisma/client';
import { faker } from '@faker-js/faker';
import * as argon2 from 'argon2';

const prisma = new PrismaClient();

enum Role {
  BUYER = 'BUYER',
  SELLER = 'SELLER',
  ADMINISTRATOR = 'ADMINISTRATOR',
}

async function main() {
  await prisma.user.deleteMany({}); // use with caution.

  const amountOfUsers = 25;

  const users = [];
  const password = await argon2.hash('test123');

  for (let i = 0; i < amountOfUsers; i++) {
    const user = {
      name: faker.person.fullName(),
      email: faker.internet.email(),
      password: password,
      role: faker.helpers.arrayElement(Object.values(Role)),
      isActive: faker.datatype.boolean(),
      bio: faker.person.bio(),
      createdAt: faker.date.past(),
      updatedAt: faker.date.recent(),
    };

    users.push(user);
  }

  const addUsers = async () => await prisma.user.createMany({ data: users });

  addUsers();
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
