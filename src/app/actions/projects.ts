'use server';

import { auth } from '@/auth';
import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  ProjectSchema,
  type ProjectInputSchemaType,
  type IconName,
} from '@/lib/schemas';
import type { Project as PrismaProject } from '@/generated/client';

export type Project = z.infer<typeof ProjectSchema>;

export async function getProjects(): Promise<Project[]> {
  const projectsData = await db.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Validate and transform the data to match the ProjectSchema
  const validatedProjects = ProjectSchema.array().parse(
    projectsData.map((p) => ({
      ...p,
      keyFeatures: (p.keyFeatures || '').split(',').map((s) => s.trim()),
      icon: p.icon as IconName,
      userId: p.userId === null ? undefined : p.userId, // Ensure null is converted to undefined
    }))
  );

  return validatedProjects;
}

export async function createProject(
  data: ProjectInputSchemaType
): Promise<Project> {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const validatedData = ProjectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }).parse(data);

  const { keyFeatures, ...rest } = validatedData;
  const newProjectData = await db.project.create({
    data: {
      ...rest,
      keyFeatures: keyFeatures.join(','),
      userId: session.user.id,
    },
  });

  const newProject = ProjectSchema.parse({
    ...newProjectData,
    keyFeatures: (newProjectData.keyFeatures || '').split(',').map((s) => s.trim()),
    icon: newProjectData.icon as IconName,
    userId: newProjectData.userId === null ? undefined : newProjectData.userId,
  });

  revalidatePath('/');
  return newProject;
}

export async function updateProject(
  id: number,
  data: ProjectInputSchemaType
): Promise<Project> {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  const validatedData = ProjectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }).parse(data);
  const { keyFeatures, ...rest } = validatedData;

  const updatedProjectData = await db.project.update({
    where: { id },
    data: {
      ...rest,
      keyFeatures: keyFeatures.join(','),
    },
  });

  const updatedProject = ProjectSchema.parse({
    ...updatedProjectData,
    keyFeatures: (updatedProjectData.keyFeatures || '')
      .split(',')
      .map((s) => s.trim()),
    icon: updatedProjectData.icon as IconName,
    userId: updatedProjectData.userId === null ? undefined : updatedProjectData.userId,
  });

  revalidatePath('/');
  return updatedProject;
}

export async function deleteProject(id: number): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== 'ADMIN') {
    throw new Error('Unauthorized');
  }

  await db.project.delete({
    where: { id },
  });
  revalidatePath('/');
}
