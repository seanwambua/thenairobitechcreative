'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';

const CreateUserSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
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

  // In a real app, you would hash the password here.
  // For this prototype, we are not storing the password.
  const user = await prisma.user.create({
    data: {
      name: validatedData.name,
      email: validatedData.email,
    },
  });

  return user;
}
