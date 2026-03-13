import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProjectsClient } from './projects-client';
import { getProjects } from '@/lib/actions/projects';
import { auth } from '@/lib/auth';
import { redirect } from 'next/navigation';
import { Role } from '@/lib/roles';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const session = await auth();
  if (session?.user?.role !== Role.ADMIN) {
    redirect('/unauthorized');
  }

  const projects = await getProjects();

  return (
    <Card className="border-0 shadow-none p-0">
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
