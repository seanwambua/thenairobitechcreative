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

## 💡 Business Logic & Recommendations

This section outlines the core business purpose of the application and provides recommendations for future development.

### Core Concept & Architectural Philosophy

The application is designed to serve as the primary digital presence for a high-end creative technology agency. The core business logic is to showcase the agency's expertise, portfolio, and services to attract new clients.

-   **Hybrid Rendering Model:** The app intentionally uses a mix of Next.js Server Components and Client Components. Public-facing pages that require real-time interactivity (like the homepage, which must instantly reflect changes from the dashboard) are implemented as Client Components that fetch data from a client-side store (Zustand). The dashboard itself is also a Client Component to provide a rich, app-like experience. This hybrid approach offers the best of both worlds: the performance benefits of server rendering where possible and the dynamic capabilities of client rendering where needed.
-   **Server Actions for Mutations:** All database mutations (Create, Update, Delete) are handled via Next.js Server Actions. This modern approach simplifies the architecture by eliminating the need for traditional API endpoints for mutations, reducing boilerplate and improving security. Data revalidation is handled automatically via `revalidatePath`, ensuring the UI is always in sync with the database.
-   **Client-Side State Management (Zustand):** Zustand is used as a lightweight, centralized store for client-side state. It's crucial for managing UI state (like the current hero image) and for caching data fetched from the server, providing a snappy user experience and enabling real-time updates across components.

### Key Features Explained

-   **The Dashboard as a CMS:** The `/dashboard` is a complete, custom-built Content Management System. It empowers non-technical users to manage every aspect of the public-facing site without writing a single line of code. This is a core value proposition for the agency's clients.
-   **Real-time & Cross-Tab Updates:** The combination of Zustand and the Broadcast Channel API provides a superior admin experience. An administrator can edit content in one browser tab and see those changes reflected instantly on the live site in another tab, which is perfect for live demos or content reviews.

### Future Recommendations

This application provides a solid foundation. Here are recommended next steps to elevate it further:

1.  **Implement User Authentication:**
    -   **Logic:** The most critical next step is to secure the dashboard. Currently, it's publicly accessible.
    -   **Recommendation:** Integrate a full-fledged authentication solution like **Firebase Authentication**. This would allow you to create user accounts, manage roles (e.g., Admin, Editor), and protect the dashboard routes.

2.  **Expand Analytics:**
    -   **Logic:** The current analytics section in the dashboard is a placeholder. A real agency needs data on site traffic, user engagement, and content performance.
    -   **Recommendation:** Integrate a service like **Google Analytics** or **Vercel Analytics**. Create a dedicated section in the dashboard to display key metrics, such as page views, top-performing blog posts, and referral sources.

3.  **E-commerce for Services:**
    -   **Logic:** The "Initial Consult" service is a perfect candidate for direct online payment.
    -   **Recommendation:** Integrate a payment provider like **Stripe** or use a local alternative like **Paystack**. Allow users to purchase the consultation directly from the pricing page, creating a new revenue stream.

4.  **Advanced AI/Generative Features:**
    -   **Logic:** As a "Tech Creative" agency, leveraging AI is on-brand.
    -   **Recommendation:** Use a framework like **Genkit** to add generative AI features. For example, you could add an "AI-powered content assistant" in the post editor to help with drafting articles, or an "image generation" feature in the media library to create placeholder images.

## 🚀 Tech Stack

-   **Framework:** [Next.js](https://nextjs.org/) (App Router)
-   **Database:** [PostgreSQL](https://www.postgresql.org/)
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
-   A running PostgreSQL database instance.

### 1. Install Dependencies

Clone the repository and install the necessary packages.

```bash
npm install
```

### 2. Set Up Environment Variables

Create a `.env` file in the root of the project. You will need to provide your PostgreSQL database connection string and your Cloudinary credentials for image uploads.

```env
# PostgreSQL Connection String
# Replace with your actual database connection details.
# Format: postgresql://USER:PASSWORD@HOST:PORT/DATABASE?schema=public
DATABASE_URL="postgresql://postgres:password@localhost:5432/mydb?schema=public"

# Cloudinary Credentials for Image Uploads
CLOUDINARY_CLOUD_NAME="your_cloud_name"
CLOUDINARY_API_KEY="your_api_key"
CLOUDINARY_API_SECRET="your_api_secret"
```

### 3. Initialize the Database

The project uses Prisma to manage the database schema. To initialize your database with the correct schema and populate it with the starting content, run the `reinitialize` script:

```bash
npm run reinitialize
```

This command will:
1.  Push the Prisma schema to your PostgreSQL database.
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

To wipe all data from your PostgreSQL database and re-populate it with the initial content from `src/lib/data.ts`, run:

```bash
npm run db:reset
```

or the alias:

```bash
npm run reinitialize
```
