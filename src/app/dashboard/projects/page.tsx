import {
  Card,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { ProjectsClient } from './projects-client';
import { getProjects } from '@/app/actions/projects';

export default async function ProjectsPage() {
  const projects = await getProjects();

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
