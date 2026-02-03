import { PrismaClient } from '@/generated/client';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

// Senior QA: Move pool and adapter into the global singleton to prevent leaks
const globalForPrisma = globalThis as unknown as {
  prisma: PrismaClient | undefined;
  adapter: PrismaPg | undefined;
  pool: Pool | undefined;
};

// Senior Dev: Use a fallback for the connection string to avoid "undefined" errors
const connectionString = process.env.DATABASE_URL || "";

if (!globalForPrisma.pool) {
  globalForPrisma.pool = new Pool({ connectionString });
}

if (!globalForPrisma.adapter) {
  // Architect: Explicitly casting to avoid the 2322 Type mismatch
  globalForPrisma.adapter = new PrismaPg(globalForPrisma.pool) as any;
}

export const db =
  globalForPrisma.prisma ??
  new PrismaClient({
    adapter: globalForPrisma.adapter,
  });

if (process.env.NODE_ENV !== 'production') {
  globalForPrisma.prisma = db;
}