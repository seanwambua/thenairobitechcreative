'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { Role } from '@/lib/roles';
import { TaskStatus } from '@prisma/client';

export async function createTask(milestoneId: number, title: string) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) throw new Error('Unauthorized');

  const milestone = await prisma.milestone.findUnique({ where: { id: milestoneId } });
  if (!milestone) throw new Error('Milestone not found');

  const task = await prisma.task.create({
    data: {
      milestoneId,
      title,
    },
  });

  revalidatePath(`/dashboard/projects/${milestone.projectId}`);
  return task;
}

export async function updateTask(id: number, data: { title?: string; status?: TaskStatus }) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) throw new Error('Unauthorized');

  const task = await prisma.task.update({
    where: { id },
    include: { milestone: true },
    data,
  });

  revalidatePath(`/dashboard/projects/${task.milestone.projectId}`);
  return task;
}

export async function deleteTask(id: number) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) throw new Error('Unauthorized');

  const task = await prisma.task.delete({
    where: { id },
    include: { milestone: true },
  });

  revalidatePath(`/dashboard/projects/${task.milestone.projectId}`);
}
