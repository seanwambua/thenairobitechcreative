'use server';

import prisma from '@/lib/prisma';
import { revalidatePath } from 'next/cache';
import { ProjectSchema, type ProjectSchemaType } from '@/lib/schemas';
import type { Project } from '@/lib/data';

export async function createProject(data: Omit<ProjectSchemaType, 'id' | 'createdAt' | 'updatedAt'>) {
    const validatedData = ProjectSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(data);
    
    const { keyFeatures, ...rest } = validatedData;
    const newProject = await prisma.project.create({
      data: {
        ...rest,
        keyFeatures: keyFeatures.join(','),
      },
    });
    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
    const formattedProject = {
        ...newProject,
        keyFeatures: newProject.keyFeatures.split(',').map(s => s.trim())
    };
    return formattedProject;
}

export async function updateProject(project: Project) {
    const { keyFeatures, ...rest } = ProjectSchema.parse(project);
    const updatedProject = await prisma.project.update({
        where: { id: rest.id },
        data: {
            ...rest,
            keyFeatures: keyFeatures.join(','),
        },
    });
    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/analytics');
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
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
}
