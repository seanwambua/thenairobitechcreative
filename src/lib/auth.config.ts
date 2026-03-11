import type { NextAuthConfig } from 'next-auth';
import { Role } from '@/lib/roles';
import { routes } from '@/lib/routes';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: routes.login,
    error: '/unauthorized',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith(routes.admin.dashboard);

      if (isOnDashboard) {
        if (isLoggedIn) {
          if (auth?.user.role === Role.ADMIN) {
            return true; // Allow admin access to dashboard
          }
          // Logged-in but not an admin
          return Response.redirect(new URL('/unauthorized', nextUrl));
        }
        return false; // Redirect unauthenticated users from dashboard to login
      } else if (isLoggedIn && nextUrl.pathname === routes.login) {
        // Redirect logged-in users from the login page to the dashboard
        return Response.redirect(new URL(routes.admin.dashboard, nextUrl));
      }

      // Allow all other requests, including public pages for anonymous users
      // and logged-in non-admins.
      return true;
    },
    async signIn({ user }) {
      if (!user) return false;
      if (user.role === Role.ADMIN) {
        return routes.admin.dashboard;
      }
      return true;
    },
    async redirect({ url, baseUrl }) {
      // Allows relative callback URLs
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      // Allows callback URLs on the same origin
      if (new URL(url).origin === new URL(baseUrl).origin) return url;
      // Fallback to dashboard
      return baseUrl + routes.admin.dashboard;
    },
  },
  providers: [], // Add providers in the main auth.ts file
};
