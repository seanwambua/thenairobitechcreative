import NextAuth, { AuthError, type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { Role } from '@/lib/roles';
import { authConfig } from '@/lib/auth.config';
import { type Adapter } from 'next-auth/adapters';
import { createUser } from '@/lib/actions/create-user';

/**
 * Custom Error Class for granular UI feedback
 * while maintaining security (preventing account enumeration).
 */
class InvalidLoginError extends AuthError {
  static type = "Invalid credentials";
}

declare module 'next-auth' {
  interface Session {
    user: { id: string; role: Role } & DefaultSession['user'];
  }
  interface User { id: string; role: Role; }
}

declare module 'next-auth/jwt' {
  interface JWT { id: string; role: Role; }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    ...authConfig.providers,
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) return null;

          let user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          if (!user) {
            const hashedPassword = await bcrypt.hash(credentials.password as string, 10);
            user = await createUser(
              Date.now().toString(), // Or a better way to generate a unique ID
              'New User', // A default name
              credentials.email as string,
              Role.USER, // Default role
            );
          }

          if (!user.hashedPassword) {
             throw new InvalidLoginError();
          }

          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user.hashedPassword
          );

          if (!isPasswordCorrect) {
            throw new InvalidLoginError();
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as Role,
          };
        } catch (error) {
          if (error instanceof AuthError) throw error;
          console.error("[AUTH_CRITICAL_ERROR]:", error);
          throw new Error("Internal Server Error");
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
  callbacks: {
    ...authConfig.callbacks,
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.role = user.role;
      }
      return token;
    },
    async session({ session, token }) {
      if (token && session.user) {
        session.user.id = token.id;
        session.user.role = token.role;
      }
      return session;
    },
  },
});
