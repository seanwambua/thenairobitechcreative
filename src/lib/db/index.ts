import { PrismaClient } from '@/generated/client';
import { PrismaBetterSQLite3 } from '@prisma/adapter-better-sqlite3';
import Database from 'better-sqlite3';

const sqlite = new Database('prisma/dev.db');
const adapter = new PrismaBetterSQLite3(sqlite);

const prismaClientSingleton = () => {
  return new PrismaClient({ adapter });
};

declare global {
  var prisma: undefined | ReturnType<typeof prismaClientSingleton>;
}

const db = globalThis.prisma ?? prismaClientSingleton();

export { db };

if (process.env.NODE_ENV !== 'production') globalThis.prisma = db;
