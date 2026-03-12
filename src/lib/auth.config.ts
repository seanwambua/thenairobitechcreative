import type { NextAuthConfig } from 'next-auth';
import { Role } from '@/lib/roles';
import { routes } from '@/lib/routes';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: routes.login,
    error: '/unauthorized',
  },
  // Ensure middleware remains lightweight for Edge Runtime
  providers: [], 
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      
      const isDashboardRoute = nextUrl.pathname.startsWith(routes.admin.dashboard);
      const isLoginPage = nextUrl.pathname === routes.login;

      // 1. Guard Dashboard: Explicitly check for both authentication and authorization
      if (isDashboardRoute) {
        if (!isLoggedIn) return false; // Triggers redirect to sign-in page
        
        // Authorization: Only Admins can enter the dashboard
        if (userRole !== Role.ADMIN) {
          return Response.redirect(new URL('/unauthorized', nextUrl));
        }
        return true;
      }

      // 2. Prevent logged-in users from seeing the login page
      if (isLoginPage && isLoggedIn) {
        const redirectUrl = userRole === Role.ADMIN 
          ? routes.admin.dashboard 
          : '/';
        return Response.redirect(new URL(redirectUrl, nextUrl));
      }

      return true;
    },

    // JWT strategy logic: Keep this minimal to avoid bloat in the session cookie
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },

    // Session synchronization: Ensure user object in Client Components stays up-to-date
    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
      }
      return session;
    },
  },
  trustHost: true,
};