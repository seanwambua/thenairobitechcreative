import prisma from '@/lib/prisma';
import DashboardView from './dashboard-view';
import { Project } from '../actions/projects';
import type { IconName } from '@/lib/schemas';

export default async function DashboardPage() {
  try {
    const [postCount, projectCount, testimonialCount, recentProjectsFromDb] =
      await Promise.all([
        prisma.post.count(),
        prisma.project.count(),
        prisma.testimonial.count(),
        prisma.project.findMany({
          take: 5,
          orderBy: {
            createdAt: 'desc',
          },
        }),
      ]);

    const recentProjects: Project[] = recentProjectsFromDb.map((p) => ({
      ...p,
      keyFeatures: (p.keyFeatures || '')
        .split(',')
        .map((feature) => feature.trim()),
      icon: p.icon as IconName,
    }));

    return (
      <DashboardView
        postCount={postCount}
        projectCount={projectCount}
        testimonialCount={testimonialCount}
        recentProjects={recentProjects}
      />
    );
  } catch (error) {
    console.error('Failed to fetch dashboard data:', error);
    // Render the view with default/empty values in case of an error
    return (
      <DashboardView
        postCount={0}
        projectCount={0}
        testimonialCount={0}
        recentProjects={[]}
      />
    );
  }
}
