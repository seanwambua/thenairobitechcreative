import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProjectDetailClient } from './project-detail-client';
import { auth } from '@/lib/auth';
import { Role } from '@/lib/roles';
import { redirect } from 'next/navigation';

/**
 * Project Detail Page (Server Component)
 * Fetches deep project structure and serializes data for client hydration.
 */
export default async function ProjectDetailPage({ params }: { params: Promise<{ id: string }> }) {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    redirect('/unauthorized');
  }

  const { id } = await params;
  const projectId = parseInt(id);

  if (isNaN(projectId)) {
    notFound();
  }

  const projectData = await prisma.project.findUnique({
    where: { id: projectId },
    include: {
      milestones: {
        include: {
          tasks: {
            orderBy: { createdAt: 'asc' },
          },
        },
        orderBy: { createdAt: 'asc' },
      },
    },
  });

  if (!projectData) {
    notFound();
  }

  // Data Serialization: Convert Date objects to strings for Client Component stability
  const serializedProject = {
    ...projectData,
    createdAt: projectData.createdAt.toISOString(),
    updatedAt: projectData.updatedAt.toISOString(),
    milestones: projectData.milestones.map(ms => ({
      ...ms,
      createdAt: ms.createdAt.toISOString(),
      updatedAt: ms.updatedAt.toISOString(),
      tasks: ms.tasks.map(t => ({
        ...t,
        createdAt: t.createdAt.toISOString(),
        updatedAt: t.updatedAt.toISOString(),
      }))
    }))
  };

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{serializedProject.title}</h1>
        <p className="text-muted-foreground">{serializedProject.description}</p>
      </div>
      <ProjectDetailClient project={serializedProject as any} />
    </div>
  );
}
