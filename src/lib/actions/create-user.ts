'use server';

import prisma from '@/lib/prisma';
import { Role } from '@/lib/roles';

export async function createUser(id: string, name: string, email: string, role: Role) {
  const user = await prisma.user.create({
    data: {
      id,
      name,
      email,
      role,
    },
  });

  return user;
}
