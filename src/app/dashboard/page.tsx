import prisma from '@/lib/prisma';
import DashboardView from './dashboard-view';
import { getProjects } from '@/app/actions/projects';

export default async function DashboardPage() {
  const [postCount, projectCount, testimonialCount, allProjects] =
    await Promise.all([
      prisma.post.count(),
      prisma.project.count(),
      prisma.testimonial.count(),
      getProjects(),
    ]);

  const recentProjects = allProjects.slice(0, 4);

  return (
    <DashboardView
      postCount={postCount}
      projectCount={projectCount}
      testimonialCount={testimonialCount}
      recentProjects={recentProjects}
    />
  );
}
