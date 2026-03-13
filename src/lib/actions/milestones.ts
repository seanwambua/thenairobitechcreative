'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { auth } from '@/lib/auth';
import { Role } from '@/lib/roles';
import { MilestoneStatus } from '@prisma/client';

export async function createMilestone(projectId: number, title: string, description?: string) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) throw new Error('Unauthorized');

  const milestone = await prisma.milestone.create({
    data: {
      projectId,
      title,
      description,
    },
  });

  revalidatePath(`/dashboard/projects/${projectId}`);
  return milestone;
}

export async function updateMilestone(id: number, data: { title?: string; description?: string; status?: MilestoneStatus }) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) throw new Error('Unauthorized');

  const milestone = await prisma.milestone.update({
    where: { id },
    data,
  });

  revalidatePath(`/dashboard/projects/${milestone.projectId}`);
  return milestone;
}

export async function deleteMilestone(id: number) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) throw new Error('Unauthorized');

  const milestone = await prisma.milestone.delete({
    where: { id },
  });

  revalidatePath(`/dashboard/projects/${milestone.projectId}`);
}
