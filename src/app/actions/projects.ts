'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import type { Project } from '@/lib/data';

type CreateableProject = Omit<Project, 'id' | 'createdAt' | 'updatedAt'>;

export async function createProject(data: CreateableProject) {
    const { keyFeatures, ...rest } = data;
    const newProject = await prisma.project.create({
      data: {
        ...rest,
        keyFeatures: keyFeatures.join(','),
      },
    });
    revalidatePath('/dashboard/projects');
    revalidatePath('/');
    const formattedProject = {
        ...newProject,
        keyFeatures: newProject.keyFeatures.split(',').map(s => s.trim())
    };
    return formattedProject;
}

export async function updateProject(project: Project) {
    const { id, keyFeatures, ...rest } = project;
    const updatedProject = await prisma.project.update({
        where: { id },
        data: {
            ...rest,
            keyFeatures: keyFeatures.join(','),
        },
    });
    revalidatePath('/dashboard/projects');
    revalidatePath('/');
     const formattedProject = {
        ...updatedProject,
        keyFeatures: updatedProject.keyFeatures.split(',').map(s => s.trim())
    };
    return formattedProject;
}

export async function deleteProject(projectId: number) {
    await prisma.project.delete({
        where: { id: projectId },
    });
    revalidatePath('/dashboard/projects');
    revalidatePath('/');
}
