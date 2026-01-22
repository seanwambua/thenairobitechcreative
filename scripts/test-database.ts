import 'dotenv/config'
import prisma from '../src/lib/prisma'

async function testDatabase() {
  console.log('Testing database connection...')
  try {
    const user = await prisma.user.findFirst();
    console.log('Successfully connected to database and fetched a user:', user);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

testDatabase();
