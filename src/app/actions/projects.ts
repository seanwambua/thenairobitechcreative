'use server';

import { db } from '@/lib/db';
import { revalidatePath } from 'next/cache';
import { ProjectSchema, type ProjectInputSchemaType } from '@/lib/schemas';
import type { Project } from '@/lib/data';


export async function getProjects(): Promise<Project[]> {
    const projectsData = await db.project.findMany({
        orderBy: { createdAt: 'desc' },
    });

    return projectsData.map(p => ({
        ...p,
        keyFeatures: p.keyFeatures.split(',').map(s => s.trim()),
    }));
}

export async function createProject(data: ProjectInputSchemaType): Promise<Project> {
    const validatedData = ProjectSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(data);
    
    const { keyFeatures, ...rest } = validatedData;
    const newProjectData = await db.project.create({
        data: {
            ...rest,
            keyFeatures: keyFeatures.join(','),
        }
    });

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');

    return {
        ...newProjectData,
        keyFeatures: newProjectData.keyFeatures.split(',').map(s => s.trim()),
    };
}

export async function updateProject(project: Project): Promise<Project> {
    const { id, keyFeatures, ...rest } = ProjectSchema.parse(project);

    const updatedProjectData = await db.project.update({
        where: { id },
        data: {
            ...rest,
            keyFeatures: keyFeatures.join(','),
        },
    });

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');

     return {
        ...updatedProjectData,
        keyFeatures: updatedProjectData.keyFeatures.split(',').map(s => s.trim()),
    };
}

export async function deleteProject(projectId: number) {
    await db.project.delete({ where: { id: projectId }});
    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
}
