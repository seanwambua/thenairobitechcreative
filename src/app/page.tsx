'use server';
import { Hero } from '@/components/hero';
import { BentoPortfolio } from '@/components/bento-portfolio';
import { Cta } from '@/components/cta';
import { Testimonials as TestimonialsComponent } from '@/components/testimonials';
import { getFavoriteProjects } from '@/lib/actions/projects';
import { getAllTestimonials } from '@/lib/actions/testimonials';
import { getSetting } from '@/lib/actions/settings';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { ServicesSelector } from '@/components/services-selector';
import placeholderImages from '@/lib/placeholder-images.json';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

function DataError({ sectionName }: { sectionName: string }) {
  return (
    <Alert
      variant="destructive"
      className="mx-auto max-w-4xl"
      key={sectionName}
    >
      <Terminal className="h-4 w-4" />
      <AlertTitle>Error Loading {sectionName}</AlertTitle>
      <AlertDescription>
        There was a problem fetching the data for this section. The content
        might be temporarily unavailable. Please try refreshing the page later.
      </AlertDescription>
    </Alert>
  );
}

export default async function Home() {
  let projectsResult, testimonialsResult, settingsResult, logoUrlResult;

  try {
    [projectsResult, testimonialsResult, settingsResult, logoUrlResult] =
      await Promise.allSettled([
        getFavoriteProjects(),
        getAllTestimonials(),
        getSetting('heroImage'),
        getSetting('logo'),
      ]);
  } catch (e: any) {
    // This will catch db connection errors etc.
    if (e.message.includes('no such table')) {
      return <DbUninitializedError />;
    }
    // Render a full-page error for other critical failures
    return (
      <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
        <DataError sectionName="Homepage Content" />
      </div>
    );
  }

  const heroImage =
    (settingsResult.status === 'fulfilled'
      ? settingsResult.value
      : placeholderImages.hero.imageUrl) ?? '';

  const logoUrl =
    (logoUrlResult.status === 'fulfilled' ? logoUrlResult.value : null) ?? null;

  return (
    <>
      <Hero heroImage={heroImage} logoUrl={logoUrl} />

      {projectsResult.status === 'fulfilled' ? (
              projectsResult.value.length > 0 ? (
                <section id="portfolio" className="py-20 lg:py-32">
                  <div className="container mx-auto px-4">
                    <div className="mx-auto mb-16 max-w-3xl text-center">
                      <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                        Innovation Suite
                      </h2>
                      <p className="mt-4 text-lg text-zinc-500">
                        A curated showcase of our most impactful transformation tools.
                      </p>
                    </div>
                    <div className="sm:p-4 md:p-6">
                      <BentoPortfolio projects={projectsResult.value} />   
                    </div>
                  </div>
                </section>
      ) : (
        <div className="container mx-auto px-4 py-12 md:px-6 md:py-20">
          <ServicesSelector />
        </div>
      )
    ) : (
      <DataError sectionName="Portfolio" />
    )}

      {testimonialsResult.status === 'fulfilled' &&
      testimonialsResult.value.length > 0 ? (
        <TestimonialsComponent testimonials={testimonialsResult.value} />
      ) : null}

      <Cta logoUrl={logoUrl} />
    </>
  );
}
