import prisma from '@/lib/prisma';
import { notFound } from 'next/navigation';
import { ProjectDetailClient } from './project-detail-client';
import { auth } from '@/lib/auth';
import { Role } from '@/lib/roles';
import { redirect } from 'next/navigation';

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

  const project = await prisma.project.findUnique({
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

  if (!project) {
    notFound();
  }

  return (
    <div className="space-y-6">
      <div className="flex flex-col gap-2">
        <h1 className="text-3xl font-bold tracking-tight">{project.title}</h1>
        <p className="text-muted-foreground">{project.description}</p>
      </div>
      <ProjectDetailClient project={project as any} />
    </div>
  );
}
