'use server';

import { db } from '@/lib/db';
import * as schema from '@/lib/db/schema';
import { eq, desc } from 'drizzle-orm';
import { revalidatePath } from 'next/cache';
import { ProjectSchema, type ProjectSchemaType } from '@/lib/schemas';
import type { Project } from '@/lib/data';


export async function getProjects() {
    const projectsData = await db.query.projects.findMany({
        orderBy: [desc(schema.projects.createdAt)],
    });
    return projectsData.map(p => ({
        ...p,
        keyFeatures: p.keyFeatures.split(',').map(s => s.trim()),
        createdAt: new Date(p.createdAt),
        updatedAt: new Date(p.updatedAt),
    }));
}

export async function createProject(data: Omit<ProjectSchemaType, 'id' | 'createdAt' | 'updatedAt'>) {
    const validatedData = ProjectSchema.omit({ id: true, createdAt: true, updatedAt: true }).parse(data);
    
    const { keyFeatures, ...rest } = validatedData;
    const [newProjectData] = await db.insert(schema.projects).values({
        ...rest,
        keyFeatures: keyFeatures.join(','),
      }).returning();

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');

    const formattedProject = {
        ...newProjectData,
        keyFeatures: newProjectData.keyFeatures.split(',').map(s => s.trim()),
        createdAt: new Date(newProjectData.createdAt),
        updatedAt: new Date(newProjectData.updatedAt),
    };
    return formattedProject;
}

export async function updateProject(project: Project) {
    const { keyFeatures, ...rest } = ProjectSchema.parse(project);
    const { createdAt, updatedAt, ...updateData } = rest;

    const [updatedProjectData] = await db.update(schema.projects).set({
            ...updateData,
            keyFeatures: keyFeatures.join(','),
            updatedAt: new Date().toISOString(),
        })
        .where(eq(schema.projects.id, rest.id))
        .returning();

    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');

     const formattedProject = {
        ...updatedProjectData,
        keyFeatures: updatedProjectData.keyFeatures.split(',').map(s => s.trim()),
        createdAt: new Date(updatedProjectData.createdAt),
        updatedAt: new Date(updatedProjectData.updatedAt),
    };
    return formattedProject;
}

export async function deleteProject(projectId: number) {
    await db.delete(schema.projects).where(eq(schema.projects.id, projectId));
    revalidatePath('/dashboard/projects');
    revalidatePath('/dashboard/analytics');
    revalidatePath('/');
}
