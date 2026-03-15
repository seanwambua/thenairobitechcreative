import NextAuth, { AuthError, type DefaultSession } from 'next-auth';
import { PrismaAdapter } from '@auth/prisma-adapter';
import prisma from '@/lib/prisma';
import Credentials from 'next-auth/providers/credentials';
import bcrypt from 'bcryptjs';
import { Role } from '@/lib/roles';
import { authConfig } from '@/lib/auth.config';
import { type Adapter } from 'next-auth/adapters';

/**
 * Custom Error Class for granular UI feedback
 * while maintaining security (preventing account enumeration).
 */
class InvalidLoginError extends AuthError {
  static type = "Invalid credentials";
}

declare module 'next-auth' {
  interface Session {
    user: {
      id: string;
      role: Role;
      status: string;
    } & DefaultSession['user'];
  }
  interface User {
    id: string;
    role: Role;
    status: string;
  }
}

declare module 'next-auth/jwt' {
  interface JWT {
    id: string;
    role: Role;
    status: string;
  }
}

export const { handlers, auth, signIn, signOut } = NextAuth({
  ...authConfig,
  adapter: PrismaAdapter(prisma) as Adapter,
  providers: [
    Credentials({
      name: 'Credentials',
      credentials: {
        email: { label: 'Email', type: 'email' },
        password: { label: 'Password', type: 'password' },
      },
      async authorize(credentials) {
        try {
          if (!credentials?.email || !credentials.password) return null;

          const user = await prisma.user.findUnique({
            where: { email: credentials.email as string },
          });

          // Standard check: user must exist and have a password
          if (!user || !user.hashedPassword) {
             return null;
          }

          // Security check: Verify password
          const isPasswordCorrect = await bcrypt.compare(
            credentials.password as string,
            user.hashedPassword
          );

          if (!isPasswordCorrect) {
            return null;
          }

          // Approval check: Only APPROVED users can sign in
          if (user.status !== 'APPROVED' && user.role !== Role.ADMIN) {
            throw new Error("Your account is pending approval.");
          }

          return {
            id: user.id,
            name: user.name,
            email: user.email,
            role: user.role as Role,
            status: user.status,
          };
        } catch (error) {
          if (error instanceof Error) throw error;
          console.error("[AUTH_CRITICAL_ERROR]:", error);
          return null;
        }
      },
    }),
  ],
  session: { strategy: 'jwt' },
});
