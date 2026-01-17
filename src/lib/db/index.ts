import { PrismaClient } from '@/generated/client/client';
import { PrismaBetterSqlite3 } from '@prisma/adapter-better-sqlite3';
import betterSqlite3 from 'better-sqlite3';

const sqlite = betterSqlite3('./dev.db');
const adapter = new PrismaBetterSqlite3(sqlite);

let db: PrismaClient;

declare global {
  var __db__: PrismaClient | undefined;
}

// This is needed because in development we don't want to restart
// the server with every change, but we want to make sure we don't
// create a new connection to the DB with every change.
if (process.env.NODE_ENV === 'production') {
  db = new PrismaClient({ adapter });
} else {
  if (!global.__db__) {
    global.__db__ = new PrismaClient({ adapter });
  }
  db = global.__db__;
}

export { db };
