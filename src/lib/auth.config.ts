import type { NextAuthConfig } from 'next-auth';
import { Role } from '@/lib/roles';

export const authConfig: NextAuthConfig = {
  pages: {
    signIn: '/login',
    error: '/error',
    verifyRequest: '/verify-request',
    newUser: '/register',
    signOut: '/logout',
    unauthorized: '/unauthorized',
  },
  callbacks: {
    authorized({ auth, request: { nextUrl } }) {
      const isLoggedIn = !!auth?.user;
      const isOnDashboard = nextUrl.pathname.startsWith('/dashboard');

      if (isOnDashboard) {
        if (isLoggedIn) {
          if (auth.user.role === Role.ADMIN) {
            return true;
          } else {
            return Response.redirect(new URL('/unauthorized', nextUrl));
          }
        }
        return false; // Redirect unauthenticated users to login page
      } else if (isLoggedIn) {
        return Response.redirect(new URL('/dashboard', nextUrl));
      }

      return true;
    },
    async session({ session, token }) {
      if (token) {
        session.user.role = token.role as Role;
      }
      return session;
    },
    async jwt({ token, user }) {
      if (user) {
        token.role = user.role;
      }
      return token;
    },
  },
  providers: [],
};
