import DashboardView from './dashboard-view';
import { getPosts } from '@/app/actions/posts';
import { getProjects } from '@/app/actions/projects';
import { getTestimonials } from '@/app/actions/testimonials';

export default async function DashboardPage() {
  const posts = await getPosts();
  const projects = await getProjects();
  const testimonials = await getTestimonials();

  return (
    <DashboardView
      postCount={posts.length}
      projectCount={projects.length}
      testimonialCount={testimonials.length}
      recentProjects={projects.slice(0, 5)}
    />
  );
}
