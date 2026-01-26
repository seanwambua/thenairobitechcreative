'use server';
import { Hero } from '@/components/hero';
import { ProspectsBanner } from '@/components/prospects-banner';
import { BentoPortfolio } from '@/components/bento-portfolio';
import { faqs } from '@/lib/data';
import { Cta } from '@/components/cta';
import { Testimonials as TestimonialsComponent } from '@/components/testimonials';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { getProjects } from '@/app/actions/projects';
import { getTestimonials } from '@/app/actions/testimonials';
import { getSetting } from '@/app/actions/settings';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { placeholderImages } from '@/lib/placeholder-images';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

function DataError({ sectionName }: { sectionName: string }) {
  return (
    <Alert variant="destructive" className="mx-auto max-w-4xl">
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
        getProjects(),
        getTestimonials(),
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
    settingsResult.status === 'fulfilled'
      ? (settingsResult.value ?? placeholderImages.hero.imageUrl)
      : placeholderImages.hero.imageUrl;

  const logoUrl =
    logoUrlResult.status === 'fulfilled' ? logoUrlResult.value : null;

  return (
    <>
      <Hero heroImage={heroImage} logoUrl={logoUrl} />
      <ProspectsBanner />

      <section id="portfolio" className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Latest Innovation Suite
            </h2>
            <p className="mt-4 text-lg text-zinc-500">
              Showcasing our next generation of digital solutions.
            </p>
          </div>
          <div className="sm:p-4 md:p-6">
            {projectsResult.status === 'fulfilled' ? (
              <BentoPortfolio
                projects={projectsResult.value}
                logoUrl={logoUrl}
              />
            ) : (
              <DataError sectionName="Portfolio" />
            )}
          </div>
        </div>
      </section>

      {testimonialsResult.status === 'fulfilled' &&
      testimonialsResult.value.length > 0 ? (
        <TestimonialsComponent testimonials={testimonialsResult.value} />
      ) : (
        <></>
      )}

      <section id="faq" className="border-t bg-background py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Frequently Asked Questions
            </h2>
            <p className="mt-4 text-muted-foreground">
              Have questions? We've got answers. If you can't find what you're
              looking for, feel free to contact us.
            </p>
          </div>
          <div className="mx-auto max-w-3xl">
            <Accordion type="single" collapsible className="w-full">
              {faqs.map((faq) => (
                <AccordionItem key={faq.id} value={`item-${faq.id}`}>
                  <AccordionTrigger className="text-left font-semibold hover:no-underline">
                    {faq.question}
                  </AccordionTrigger>
                  <AccordionContent className="text-muted-foreground">
                    {faq.answer}
                  </AccordionContent>
                </AccordionItem>
              ))}
            </Accordion>
          </div>
        </div>
      </section>

      <Cta logoUrl={logoUrl} />
    </>
  );
}
