import prisma from '@/lib/prisma';

export async function checkDatabaseConnection() {
  try {
    await prisma.$connect();
    return { status: 'ok', message: 'Database connection successful.' };
  } catch (error: any) {
    return {
      status: 'error',
      message: 'Database connection failed.',
      error: error.message,
    };
  } finally {
    await prisma.$disconnect();
  }
}

export async function getSystemInfo() {
  const nodeVersion = process.version;
  const nextVersion = require('next/package.json').version;
  const appUrl = process.env.NEXT_PUBLIC_APP_URL || 'Not set';

  return {
    nodeVersion,
    nextVersion,
    appUrl,
  };
}
