'use server';

import { prisma } from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { auth } from '@/auth';
import { Role } from '@/lib/roles';

const CreateUserSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z
    .string()
    .min(6, { message: 'Password must be at least 6 characters.' }),
});

export async function createUser(data: z.infer<typeof CreateUserSchema>) {
  const validatedData = CreateUserSchema.parse(data);

  const existingUser = await prisma.user.findUnique({
    where: {
      email: validatedData.email,
    },
  });

  if (existingUser) {
    throw new Error('User with this email already exists.');
  }

  const hashedPassword = await bcrypt.hash(validatedData.password, 12);

  const user = await prisma.user.create({
    data: {
      name: validatedData.name,
      email: validatedData.email,
      hashedPassword: hashedPassword,
    },
  });

  return user;
}

const UpdateUserSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export async function updateUser(data: z.infer<typeof UpdateUserSchema>) {
  const session = await auth();

  if (!session?.user?.id) {
    throw new Error('You must be signed in to update your profile.');
  }

  const validatedData = UpdateUserSchema.parse(data);

  const existingUserWithEmail = await prisma.user.findFirst({
    where: {
      email: validatedData.email,
      id: { not: session.user.id },
    },
  });

  if (existingUserWithEmail) {
    throw new Error('This email address is already in use by another account.');
  }

  const user = await prisma.user.update({
    where: {
      id: session.user.id,
    },
    data: {
      name: validatedData.name,
      email: validatedData.email,
    },
  });

  return user;
}
