import { drizzle } from 'drizzle-orm/better-sqlite3';
import Database from 'better-sqlite3';
import * as schema from './schema';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set or is empty');
}

const sqlite = new Database(process.env.DATABASE_URL);
export const db = drizzle(sqlite, { schema, logger: true });