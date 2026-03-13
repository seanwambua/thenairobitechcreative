'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import { auth } from '@/lib/auth';
import { Role } from '@/lib/roles';
import {
  ProjectSchema,
  ProjectInputSchema,
  type ProjectInputSchemaType,
  type IconName,
} from '@/lib/schemas';

export type Project = z.infer<typeof ProjectSchema>;

/**
 * Fetches all projects from the database and validates them against the schema.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const projectsData = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    return projectsData.map((p) => {
      return {
        ...p,
        keyFeatures: (p.keyFeatures || '').split(',').map((s) => s.trim()),
        icon: p.icon as IconName,
        url: p.url || null,
        userId: p.userId || null,
      };
    });
  } catch (error) {
    console.error('[GET_PROJECTS_ERROR]:', error);
    return [];
  }
}

/**
 * Fetches only favorited projects for the homepage.
 */
export async function getFavoriteProjects(): Promise<Project[]> {
  try {
    const projectsData = await prisma.project.findMany({
      where: { isFavorite: true },
      orderBy: { createdAt: 'desc' },
      take: 6,
    });

    return projectsData.map((p) => {
      return {
        ...p,
        keyFeatures: (p.keyFeatures || '').split(',').map((s) => s.trim()),
        icon: p.icon as IconName,
        url: p.url || null,
        userId: p.userId || null,
      };
    });
  } catch (error) {
    console.error('[GET_FAVORITE_PROJECTS_ERROR]:', error);
    return [];
  }
}

export async function toggleProjectFavorite(id: number): Promise<{ success: boolean; error?: string }> {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    return { success: false, error: 'Unauthorized' };
  }

  try {
    const project = await prisma.project.findUnique({
      where: { id },
      select: { isFavorite: true }
    });

    if (!project) return { success: false, error: 'Project not found' };

    if (!project.isFavorite) {
      const favoriteCount = await prisma.project.count({
        where: { isFavorite: true }
      });

      if (favoriteCount >= 6) {
        return { success: false, error: 'Maximum of 6 favorited projects allowed.' };
      }
    }

    await prisma.project.update({
      where: { id },
      data: { isFavorite: !project.isFavorite }
    });

    revalidatePath('/');
    revalidatePath('/dashboard/projects');
    return { success: true };
  } catch (error) {
    console.error('[TOGGLE_FAVORITE_ERROR]:', error);
    return { success: false, error: 'Failed to update favorite status.' };
  }
}

export async function upsertProject(
  data: ProjectInputSchemaType & { id?: number }
): Promise<Project> {
  if (data.id) {
    return updateProject(data.id, data);
  } else {
    return createProject(data);
  }
}

export async function createProject(
  data: ProjectInputSchemaType
): Promise<Project> {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }

  const validation = ProjectInputSchema.safeParse(data);

  if (!validation.success) {
    throw new Error('Invalid project data: ' + validation.error.message);
  }

  const { keyFeatures, ...rest } = validation.data;
  const newProjectData = await prisma.project.create({
    data: {
      ...rest,
      keyFeatures: keyFeatures.join(','),
      isFavorite: rest.isFavorite ?? false,
      url: validation.data.url,
      userId: session.user.id,
    },
  });

  const newProject: Project = {
    ...newProjectData,
    keyFeatures: (newProjectData.keyFeatures || '')
      .split(',')
      .map((s) => s.trim()),
    icon: newProjectData.icon as IconName,
    userId: newProjectData.userId || null,
    url: newProjectData.url || null,
  };

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/dashboard/projects');
  return newProject;
}

export async function updateProject(
  id: number,
  data: ProjectInputSchemaType
): Promise<Project> {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }

  const validation = ProjectInputSchema.partial().safeParse(data);

  if (!validation.success) {
    throw new Error('Invalid project data.');
  }

  const { keyFeatures, ...rest } = validation.data;

  const updateData: any = { ...rest };
  if (keyFeatures) {
    updateData.keyFeatures = keyFeatures.join(',');
  }

  const updatedProjectData = await prisma.project.update({
    where: { id },
    data: updateData,
  });

  const updatedProject: Project = {
    ...updatedProjectData,
    keyFeatures: (updatedProjectData.keyFeatures || '')
      .split(',')
      .map((s) => s.trim()),
    icon: updatedProjectData.icon as IconName,
    userId: updatedProjectData.userId || null,
    url: updatedProjectData.url || null,
  };

  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/dashboard/projects');
  return updatedProject;
}

export async function deleteProject(id: number): Promise<void> {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    throw new Error('Unauthorized');
  }

  await prisma.project.delete({
    where: { id },
  });
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/dashboard/projects');
}
