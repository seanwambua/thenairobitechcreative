'use server';

import prisma from '@/lib/prisma';
import { UserStatus, Role } from '@prisma/client';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth'; // Ensure this points to your NextAuth export

// 1. Standardized Action Response Type
type ActionResponse<T = any> = 
  | { success: true; data: T; message?: string }
  | { success: false; error: string };

// 2. Upgraded Authorization Guard
async function validateAdmin(): Promise<{ authorized: boolean; error?: string }> {
  try {
    const session = await auth();
    if (!session || session.user?.role !== Role.ADMIN) {
      return { authorized: false, error: 'Forbidden: Admin privileges required.' };
    }
    return { authorized: true };
  } catch {
    return { authorized: false, error: 'Authentication service unavailable.' };
  }
}

export async function getUsers(): Promise<ActionResponse<any[]>> {
  const authCheck = await validateAdmin();
  if (!authCheck.authorized) return { success: false, error: authCheck.error! };

  try {
    const users = await prisma.user.findMany({
      orderBy: { createdAt: 'desc' },
      // QA Note: Never return hashedPassword to the client
      select: {
        id: true,
        name: true,
        email: true,
        role: true,
        status: true,
        createdAt: true,
      }
    });
    return { success: true, data: users };
  } catch (error) {
    console.error('[GET_USERS_ERROR]:', error);
    return { success: false, error: 'Failed to fetch users list.' };
  }
}

export async function updateUserStatus(userId: string, status: UserStatus): Promise<ActionResponse> {
  const authCheck = await validateAdmin();
  if (!authCheck.authorized) return { success: false, error: authCheck.error! };

  try {
    await prisma.user.update({
      where: { id: userId },
      data: { status },
    });
    
    revalidatePath('/dashboard/users');
    return { success: true, data: null, message: 'Status updated successfully.' };
  } catch (error) {
    console.error('[UPDATE_STATUS_ERROR]:', error);
    return { success: false, error: 'Could not update user status.' };
  }
}

export async function updateUserRole(userId: string, role: Role): Promise<ActionResponse> {
  const authCheck = await validateAdmin();
  if (!authCheck.authorized) return { success: false, error: authCheck.error! };

  try {
    // Logic Guard: Prevent an admin from accidentally de-ranking themselves
    const session = await auth();
    if (session?.user?.id === userId && role !== Role.ADMIN) {
      return { success: false, error: 'You cannot remove your own admin privileges.' };
    }

    await prisma.user.update({
      where: { id: userId },
      data: { role },
    });

    revalidatePath('/dashboard/users');
    return { success: true, data: null, message: 'Role updated successfully.' };
  } catch (error) {
    console.error('[UPDATE_ROLE_ERROR]:', error);
    return { success: false, error: 'Failed to update user role.' };
  }
}

export async function deleteUser(userId: string): Promise<ActionResponse> {
  const authCheck = await validateAdmin();
  if (!authCheck.authorized) return { success: false, error: authCheck.error! };

  try {
    await prisma.user.delete({
      where: { id: userId },
    });

    revalidatePath('/dashboard/users');
    return { success: true, data: null, message: 'User deleted permanently.' };
  } catch (error) {
    console.error('[DELETE_USER_ERROR]:', error);
    return { success: false, error: 'User could not be deleted.' };
  }
}