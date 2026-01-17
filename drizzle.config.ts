
import type { Config } from "drizzle-kit";

const dbUrl = process.env.DATABASE_URL || "sqlite.db";

export default {
  schema: "./src/lib/db/schema.ts",
  out: "./drizzle",
  driver: "better-sqlite",
  dbCredentials: {
    url: dbUrl,
  },
} satisfies Config;
