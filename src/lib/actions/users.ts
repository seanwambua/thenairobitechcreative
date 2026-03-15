'use server';

import prisma from '@/lib/prisma';
import { z } from 'zod';
import bcrypt from 'bcryptjs';
import { auth } from '@/lib/auth';
import { Role } from '@/lib/roles';
import { revalidatePath } from 'next/cache';

// Unified Response Type for predictable UI handling
type ActionResponse<T> = 
  | { success: true; data: T; message?: string }
  | { success: false; error: string; fields?: Record<string, string[]> };

const CreateUserSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
  password: z.string().min(6, { message: 'Password must be at least 6 characters.' }),
});

export async function createUser(data: z.infer<typeof CreateUserSchema>): Promise<ActionResponse<any>> {
  try {
    // 1. Safe Parsing (Don't let .parse() throw an unhandled exception)
    const validation = CreateUserSchema.safeParse(data);
    if (!validation.success) {
      return { 
        success: false, 
        error: 'Validation failed', 
        fields: validation.error.flatten().fieldErrors 
      };
    }

    const { email, password, name } = validation.data;

    // 2. Atomic Database Check
    const existingUser = await prisma.user.findUnique({ where: { email } });
    if (existingUser) {
      return { success: false, error: 'User with this email already exists.' };
    }

    const hashedPassword = await bcrypt.hash(password, 12);

    const user = await prisma.user.create({
      data: {
        name,
        email,
        hashedPassword,
        role: Role.USER,
      },
    });

    return { success: true, data: { id: user.id, email: user.email }, message: 'Account created!' };
  } catch (error) {
    console.error('[CREATE_USER_ERROR]:', error);
    return { success: false, error: 'An unexpected error occurred during registration.' };
  }
}

const UpdateUserSchema = z.object({
  name: z.string().min(2, { message: 'Name must be at least 2 characters.' }),
  email: z.string().email({ message: 'Please enter a valid email address.' }),
});

export async function updateUser(data: z.infer<typeof UpdateUserSchema>): Promise<ActionResponse<any>> {
  try {
    const session = await auth();
    if (!session?.user?.id) {
      return { success: false, error: 'Unauthorized. Please sign in.' };
    }

    const validation = UpdateUserSchema.safeParse(data);
    if (!validation.success) {
      return { success: false, error: 'Invalid input data.', fields: validation.error.flatten().fieldErrors };
    }

    const { email, name } = validation.data;

    // 3. Prevent collisions and verify identity in one flow
    const user = await prisma.user.update({
      where: { id: session.user.id },
      data: { name, email },
    });

    // 4. Trigger cache clearing for the profile page
    revalidatePath('/dashboard');
    
    return { success: true, data: user, message: 'Profile updated successfully.' };
  } catch (error: any) {
    // Handle Prisma P2002 (Unique constraint failed)
    if (error.code === 'P2002') {
      return { success: false, error: 'This email is already taken.' };
    }
    console.error('[UPDATE_USER_ERROR]:', error);
    return { success: false, error: 'Failed to update profile.' };
  }
}