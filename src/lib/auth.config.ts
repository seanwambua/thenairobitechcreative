import type { NextAuthConfig } from 'next-auth';
import { Role } from '@/lib/roles';
import { routes } from '@/lib/routes';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: routes.login,
    error: '/unauthorized',
  },
  providers: [], 
  callbacks: {
    async authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const userRole = auth?.user?.role;
      
      const isDashboardRoute = nextUrl.pathname.startsWith(routes.admin.dashboard);
      const isLoginPage = nextUrl.pathname === routes.login;

      // 1. Guard Dashboard: Explicitly check for both authentication and authorization
      if (isDashboardRoute) {
        if (!isLoggedIn) return false; 
        
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

    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
        token.status = user.status;
      }
      return token;
    },

    async session({ session, token }) {
      if (session.user && token) {
        session.user.id = token.id as string;
        session.user.role = token.role as Role;
        session.user.status = token.status as string;
      }
      return session;
    },
  },
  trustHost: true,
};
