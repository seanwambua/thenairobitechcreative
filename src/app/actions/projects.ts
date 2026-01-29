'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { z } from 'zod';
import {
  ProjectSchema,
  type ProjectInputSchemaType,
  type IconName,
} from '@/lib/schemas';
import type { Project as PrismaProject } from '@/app/generated/prisma';

export type Project = z.infer<typeof ProjectSchema>;

export async function getProjects(): Promise<Project[]> {
  const projectsData = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  // Validate and transform the data to match the ProjectSchema
  const validatedProjects = ProjectSchema.array().parse(
    projectsData.map((p) => ({
      ...p,
      keyFeatures: (p.keyFeatures || '').split(',').map((s) => s.trim()),
      icon: p.icon as IconName,
    }))
  );

  return validatedProjects;
}

export async function createProject(
  data: ProjectInputSchemaType
): Promise<Project> {
  const validatedData = ProjectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }).parse(data);

  const { keyFeatures, ...rest } = validatedData;
  const newProjectData = await prisma.project.create({
    data: {
      ...rest,
      keyFeatures: keyFeatures.join(','),
    },
  });

  const newProject: Project = {
    ...newProjectData,
    keyFeatures: (newProjectData.keyFeatures || '')
      .split(',')
      .map((s) => s.trim()),
    icon: newProjectData.icon as IconName,
  };

  revalidatePath('/');
  return newProject;
}

export async function updateProject(
  id: number,
  data: ProjectInputSchemaType
): Promise<Project> {
  const validatedData = ProjectSchema.omit({
    id: true,
    createdAt: true,
    updatedAt: true,
  }).parse(data);
  const { keyFeatures, ...rest } = validatedData;

  const updatedProjectData = await prisma.project.update({
    where: { id },
    data: {
      ...rest,
      keyFeatures: keyFeatures.join(','),
    },
  });

  const updatedProject: Project = {
    ...updatedProjectData,
    keyFeatures: (updatedProjectData.keyFeatures || '')
      .split(',')
      .map((s) => s.trim()),
    icon: updatedProjectData.icon as IconName,
  };

  revalidatePath('/');
  return updatedProject;
}

export async function deleteProject(id: number): Promise<void> {
  await prisma.project.delete({
    where: { id },
  });
  revalidatePath('/');
}
