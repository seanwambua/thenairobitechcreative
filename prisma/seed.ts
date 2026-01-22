import { seedDatabase } from '../src/lib/db/seed';
import prisma from '../src/lib/prisma';

async function main() {
  try {
    await seedDatabase();
  } catch (error) {
    console.error('Error during database seeding:', error);
    process.exit(1);
  } finally {
    await prisma.$disconnect();
  }
}

main();
