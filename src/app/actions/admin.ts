'use server';
import { db } from '@/lib/db';
import { UserStatus, Role } from '@/generated/client';
import { revalidatePath } from 'next/cache';
import { auth } from '@/auth';

async function checkAdmin() {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }
}

export async function getUsers() {
  await checkAdmin();
  return db.user.findMany({
    orderBy: {
      createdAt: 'desc',
    },
  });
}

export async function updateUserStatus(userId: string, status: UserStatus) {
  await checkAdmin();
  await db.user.update({
    where: { id: userId },
    data: { status },
  });
  revalidatePath('/dashboard/users');
}

export async function updateUserRole(userId: string, role: Role) {
  await checkAdmin();
  await db.user.update({
    where: { id: userId },
    data: { role },
  });
  revalidatePath('/dashboard/users');
}

export async function deleteUser(userId: string) {
  await checkAdmin();
  await db.user.delete({
    where: { id: userId },
  });
  revalidatePath('/dashboard/users');
}
