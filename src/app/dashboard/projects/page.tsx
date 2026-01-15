import prisma from '@/lib/prisma';
import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProjectsClient } from './projects-client';

export default async function ProjectsPage() {
  const projectsData = await prisma.project.findMany({
    orderBy: { createdAt: 'desc' },
  });

  const projects = projectsData.map((p) => ({
    ...p,
    keyFeatures: p.keyFeatures.split(',').map((s) => s.trim()),
  }));

  return (
    <Card>
      <CardHeader className="flex flex-row items-center justify-between">
        <div>
          <CardTitle>Portfolio Projects</CardTitle>
          <CardDescription>Manage your portfolio projects.</CardDescription>
        </div>
      </CardHeader>
      <ProjectsClient initialProjects={projects} />
    </Card>
  );
}