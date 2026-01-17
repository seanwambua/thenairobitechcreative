import { db } from '../src/lib/db';
import { seedDatabase } from '../src/lib/db/seed';

async function main() {
  try {
    console.log('Starting database seed...');
    await seedDatabase();
    console.log('Database seeded successfully.');
  } catch (e) {
    console.error('Error during database seeding:', e);
    process.exit(1);
  } finally {
    await db.$disconnect();
  }
}

main();
