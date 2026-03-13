'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  ProjectSchema,
  type ProjectInputSchemaType,
  type IconName,
} from '@/lib/schemas';

export type Project = z.infer<typeof ProjectSchema>;

/**
 * Fetches all projects from the database and validates them against the schema.
 * Handles the conversion of keyFeatures from a stored string to an array.
 */
export async function getProjects(): Promise<Project[]> {
  try {
    const projectsData = await prisma.project.findMany({
      orderBy: { createdAt: 'desc' },
    });

    const validatedProjects = projectsData.map((p) => {
      const parsed = ProjectSchema.safeParse({
        ...p,
        keyFeatures: (p.keyFeatures || '').split(',').map((s) => s.trim()),
        icon: p.icon as IconName,
        url: p.url || null,
        userId: p.userId || null,
      });
      
      if (!parsed.success) {
        console.error(`[VALIDATION_ERROR] Project ID ${p.id}:`, parsed.error.format());
        return null;
      }
      return parsed.data;
    }).filter((p): p is Project => p !== null);

    return validatedProjects;
  } catch (error) {
    console.error('[GET_PROJECTS_ERROR]:', error);
    return [];
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
  const validation = ProjectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
  }).safeParse(data);

  if (!validation.success) {
    throw new Error('Invalid project data.');
  }

  const { keyFeatures, ...rest } = validation.data;
  const newProjectData = await prisma.project.create({
    data: {
      ...rest,
      keyFeatures: keyFeatures.join(','),
      url: validation.data.url,
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
  const validation = ProjectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
    userId: true,
  }).safeParse(data);

  if (!validation.success) {
    throw new Error('Invalid project data.');
  }

  const { keyFeatures, ...rest } = validation.data;

  const updatedProjectData = await prisma.project.update({
    where: { id },
    data: {
      ...rest,
      keyFeatures: keyFeatures.join(','),
      url: validation.data.url,
    },
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
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath('/');
  revalidatePath('/projects');
  revalidatePath('/dashboard/projects');
}
