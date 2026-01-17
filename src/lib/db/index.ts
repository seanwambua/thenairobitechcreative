import { drizzle } from 'drizzle-orm/neon-http';
import { neon } from '@neondatabase/serverless';
import * as schema from './schema';

const placeholderUrl = 'postgresql://user:password@host:port/db?sslmode=require';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set. Please create a .env file and add your Neon database connection string.');
}

if (process.env.DATABASE_URL === placeholderUrl) {
    throw new Error('Your DATABASE_URL is still set to the placeholder value. Please update your .env file with your actual Neon database connection string.');
}

const sql = neon(process.env.DATABASE_URL);
export const db = drizzle(sql, { schema, logger: true });
