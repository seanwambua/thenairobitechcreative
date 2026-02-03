import { defineConfig } from 'prisma/config';
import { PrismaPg } from '@prisma/adapter-pg';
import { Pool } from 'pg';

/** @Architect: Explicitly defining the Driver Adapter for Prisma 7 */
const pool = new Pool({ connectionString: process.env.DATABASE_URL });
const adapter = new PrismaPg(pool);

export default defineConfig({
  adapter,
  output: './generated/client', 
});
