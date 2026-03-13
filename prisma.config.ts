import { defineConfig } from '@prisma/config';

/**
 * Prisma 7 Configuration
 * This file replaces the 'url' property in schema.prisma for CLI operations.
 * It ensures that the Prisma CLI can connect to the database for migrations.
 */
export default defineConfig({
  earlyAccess: true,
  datasource: {
    url: process.env.DATABASE_URL,
  },
});
