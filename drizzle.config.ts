import type { Config } from "drizzle-kit";

const placeholderUrl = 'postgresql://user:password@host:port/db?sslmode=require';

if (!process.env.DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is not set. Please create a .env file and add your Neon database connection string.');
}

if (process.env.DATABASE_URL === placeholderUrl) {
    throw new Error('Your DATABASE_URL is still set to the placeholder value. Please update your .env file with your actual Neon database connection string before running migrations.');
}

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  driver: "pg",
  dbCredentials: {
    connectionString: process.env.DATABASE_URL,
  },
} satisfies Config;
