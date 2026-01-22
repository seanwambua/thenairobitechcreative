# Bootstrap Next.js app with Prisma Postgres (Prisma 7)

This is a full-stack Next.js application that serves as a portfolio and Content Management System (CMS). It uses Prisma ORM 7 for database interaction with a PostgreSQL database, following best practices for production-ready applications.

## Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Database ORM:** [Prisma](https://www.prisma.io/)
-   **Database:** PostgreSQL
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
-   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
-   **Validation:** [Zod](https://zod.dev/)
-   **Server Logic:** Next.js Server Actions

## Project Structure

The project follows a structure designed for clarity and scalability, with the Prisma client generated inside the `src/app` directory as specified by the architectural guidelines.

```
.
├── prisma/               # Prisma schema and migrations
├── public/               # Static assets
├── scripts/              # Test scripts (e.g., test-database.ts)
├── src/
│   ├── app/
│   │   ├── generated/    # Generated Prisma Client
│   │   │   └── prisma/
│   │   ├── api/          # API routes
│   │   └── ...           # Other Next.js app routes
│   ├── components/
│   │   ├── ui/           # ShadCN UI components
│   │   └── (custom)      # Custom application components
│   ├── lib/              # Core utilities, schemas, and db client (prisma.ts)
│   └── store/            # Zustand stores
├── .env                  # Environment variables (DATABASE_URL)
├── package.json
└── tailwind.config.ts
```

## Getting Started

Follow these steps to get the project up and running. This workflow is based on the provided architectural blueprint.

### 1. Install Dependencies

Clone the repository and install the required npm packages.

```bash
# Install production dependencies
npm install @prisma/adapter-pg @prisma/client dotenv

# Install development dependencies
npm install prisma ts-node typescript @types/node --save-dev
```

### 2. Initialize Prisma and Create Database

Run the following command to initialize Prisma and create a cloud Prisma Postgres database.

> **Note**: This command is **interactive**. You will be prompted to authenticate with Prisma and choose a region and project name. **You must run this command in your own terminal.**

```bash
npx prisma init --db --output ../src/app/generated/prisma
```

This will create a `.env` file with your `DATABASE_URL` and configure the output path for the Prisma client in your `prisma/schema.prisma` file.

### 3. Verify `.env` File

Ensure the generated `.env` file contains a `DATABASE_URL` with a `postgres://` scheme.

```env
DATABASE_URL="postgres://..."
```

### 4. Update Database Schema

Add your data models to the `prisma/schema.prisma` file. For example:

```prisma
model User {
  id        Int      @id @default(autoincrement())
  email     String   @unique
  name      String?
  createdAt DateTime @default(now())
  updatedAt DateTime @updatedAt
}
```

### 5. Create Global Prisma Client

Create a file at `src/lib/prisma.ts` and add the following code to instantiate a global Prisma client singleton.

```typescript
import { PrismaClient } from '../app/generated/prisma/client'
import { PrismaPg } from '@prisma/adapter-pg'

const adapter = new PrismaPg({
  connectionString: process.env.DATABASE_URL!,
})

const globalForPrisma = global as unknown as { prisma: PrismaClient }

const prisma = globalForPrisma.prisma || new PrismaClient({
  adapter,
})

if (process.env.NODE_ENV !== 'production') globalForPrisma.prisma = prisma

export default prisma
```

### 6. Update `package.json` Scripts

Add the `db:test` and `db:studio` scripts to your `package.json`.

```json
"scripts": {
  "dev": "next dev",
  "build": "next build",
  "start": "next start",
  "lint": "next lint",
  "db:seed": "ts-node prisma/seed.ts",
  "db:test": "ts-node scripts/test-database.ts",
  "db:studio": "prisma studio"
}
```

### 7. Create Test Script

Create a file at `scripts/test-database.ts` to verify the database connection.

```typescript
import 'dotenv/config'
import prisma from '../src/lib/prisma'

async function testDatabase() {
  console.log('Testing database connection...')
  try {
    const user = await prisma.user.findFirst();
    console.log('Successfully connected to database and fetched a user:', user);
  } catch (error) {
    console.error('Failed to connect to the database:', error);
  }
}

testDatabase();
```

### 8. Push Schema and Generate Client

Apply your schema to the database and generate the Prisma client.

```bash
# Push schema to the database
npx prisma db push

# Generate Prisma Client
npx prisma generate
```

### 9. Test the Setup

Run the test script to ensure everything is configured correctly.

```bash
npm run db:test
```

### 10. Run the Development Server

Start the Next.js development server.

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).

## Useful Commands

-   `npm run db:seed`: Populates the database with initial data.
-   `npm run db:studio`: Opens Prisma Studio, a visual editor for your database.
-   `npx prisma migrate dev`: Creates and applies a new database migration.
