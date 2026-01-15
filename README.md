# The Nairobi Tech Creative - Full-Stack Portfolio & CMS

This is a complete, production-ready website and Content Management System (CMS) for "The Nairobi Tech Creative," a fictional digital agency. It's built with a modern, full-stack Next.js architecture and features a comprehensive dashboard for managing all site content.

The application uses a hybrid rendering approach, leveraging Next.js Server Components for static pages and Client Components for interactive, real-time updated sections.

## ✨ Features

-   **Public-Facing Website:** A beautiful, responsive website including:
    -   Homepage with Hero, Portfolio, Testimonials, and FAQ sections.
    -   Services and Pricing pages.
    -   A fully-featured Blog with individual post pages.
-   **Comprehensive Dashboard:** A secure, client-side rendered dashboard for managing:
    -   **Content:** Create, update, and delete blog posts.
    -   **Projects:** Manage portfolio projects displayed on the homepage.
    -   **Testimonials:** Add and edit customer testimonials.
    -   **Media:** Upload and manage all site imagery, including the hero image, logo, and author avatars.
-   **Real-time Updates:** Changes made in the dashboard are instantly reflected on the public website without requiring a page refresh.
-   **Cross-Tab Synchronization:** State is synchronized across multiple browser tabs using the Broadcast Channel API. A change in a dashboard tab will automatically update any other open tabs viewing the site.
-   **Dark Mode:** Full support for light and dark themes.

## 🚀 Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Styling:** [Tailwind CSS](https://tailwindcss.com/)
-   **UI Components:** [ShadCN UI](https://ui.shadcn.com/)
-   **Database ORM:** [Prisma](https://www.prisma.io/)
-   **State Management:** [Zustand](https://github.com/pmndrs/zustand)
-   **Validation:** [Zod](https://zod.dev/) for end-to-end type-safe validation.
-   **Server Logic:** Next.js Server Actions for database mutations.

## 📂 Project Structure

```
.
├── prisma/
│   └── seed.ts         # Database seed script
├── public/             # Static assets
├── src/
│   ├── app/
│   │   ├── (public)/   # Route group for public-facing pages (page.tsx, blog/, etc.)
│   │   ├── dashboard/  # Route group for the admin dashboard
│   │   ├── actions/    # Server Actions for database mutations
│   │   └── api/        # API routes for data fetching
│   ├── components/
│   │   ├── ui/         # ShadCN UI components
│   │   └── (custom)    # Custom application components
│   ├── hooks/          # Custom React hooks (e.g., useBroadcast)
│   ├── lib/            # Core utilities, data, schemas, and Prisma client
│   └── store/          # Zustand stores for client-side state
├── package.json
└── tailwind.config.ts
```

## ▶️ Getting Started

Follow these steps to get the project up and running on your local machine.

### Prerequisites

-   Node.js (v18 or later)
-   npm or yarn

### 1. Install Dependencies

Clone the repository and install the necessary packages.

```bash
npm install
```

### 2. Set Up Environment Variables

This project uses Cloudinary for image uploads. Create a `.env` file in the root of the project and add your Cloudinary credentials:

```env
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 3. Initialize the Database

The project uses Prisma with a SQLite database by default. To initialize and seed your database with the starting content, run the `reinitialize` script:

```bash
npm run reinitialize
```

This command will:
1.  Push the Prisma schema to the database.
2.  Run the seed script (`prisma/seed.ts`) to populate the database with initial projects, posts, and testimonials.

### 4. Run the Development Server

Start the Next.js development server:

```bash
npm run dev
```

The application will be available at [http://localhost:9002](http://localhost:9002).
- The public website is at the root URL.
- The dashboard is available at `/dashboard`.

## 🗃️ Database Management

The `package.json` file includes a convenient script for resetting the database at any time during development.

### Resetting and Re-seeding

To wipe all data and re-populate the database with the initial content from `src/lib/data.ts`, run:

```bash
npm run db:reset
```

or the alias:

```bash
npm run reinitialize
```
