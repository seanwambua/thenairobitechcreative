import { getProjects } from '@/lib/actions/projects';
import { BentoPortfolio } from '@/components/bento-portfolio';

export const dynamic = 'force-dynamic';

export default async function ProjectsPage() {
  const projects = await getProjects();

  return (
    <section className="py-24 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Our Innovation Portfolio
          </h1>
          <p className="mt-6 text-lg text-muted-foreground md:text-xl">
            A comprehensive showcase of digital solutions we've crafted to empower businesses and transform communities.
          </p>
        </div>
        
        {projects.length === 0 ? (
          <div className="flex min-h-[400px] items-center justify-center rounded-2xl border-2 border-dashed bg-muted/20">
            <p className="text-muted-foreground">No projects to display at the moment.</p>
          </div>
        ) : (
          <BentoPortfolio projects={projects} />
        )}
      </div>
    </section>
  );
}
