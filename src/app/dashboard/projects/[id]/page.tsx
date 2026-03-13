import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProjectDetailClient } from './project-detail-client';
import { auth } from '@/lib/auth';
import { Role } from '@/lib/roles';
import { redirect } from 'next/navigation';

export const dynamic = 'force-dynamic';

/**
 * Project Detail Page (Server Component)
 * Fetches deep project structure and serializes data for client hydration.
 * Optimized to prevent hydration errors with deep date objects.
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

  // Explicit Data Serialization: Convert to plain JS objects
  // This prevents the "cannot pass Date object" issues in some environments/complex structures
  const serializedProject = {
    id: projectData.id,
    title: projectData.title,
    description: projectData.description,
    isFavorite: projectData.isFavorite,
    milestones: projectData.milestones.map(ms => ({
      id: ms.id,
      title: ms.title,
      description: ms.description,
      status: ms.status,
      tasks: ms.tasks.map(t => ({
        id: t.id,
        title: t.title,
        status: t.status,
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
