'use client';

import { useEffect, useState } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
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
import type { Project, Testimonial } from '@/lib/data';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { Terminal } from 'lucide-react';

function PortfolioSkeleton() {
    return (
        <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {[...Array(6)].map((_, i) => (
                <div key={i} className="flex flex-col space-y-3 rounded-lg border bg-card p-4">
                    <Skeleton className="h-[200px] w-full rounded-lg" />
                    <div className="space-y-2">
                        <Skeleton className="h-6 w-3/4" />
                        <Skeleton className="h-4 w-full" />
                        <Skeleton className="h-4 w-1/2" />
                    </div>
                </div>
            ))}
        </div>
    );
}

function TestimonialsSkeleton() {
    return (
        <div className="w-full">
             <div className="mx-auto mb-16 max-w-3xl text-center">
                <Skeleton className="h-10 w-2/3 mx-auto" />
                <Skeleton className="h-6 w-full mt-4 mx-auto" />
             </div>
            <div className="relative flex items-center justify-center">
                 <Skeleton className="h-[350px] w-full max-w-4xl rounded-xl" />
            </div>
        </div>
    )
}

function DataError({ sectionName }: { sectionName: string }) {
    return (
        <Alert variant="destructive" className="max-w-4xl mx-auto">
            <Terminal className="h-4 w-4" />
            <AlertTitle>Error Loading {sectionName}</AlertTitle>
            <AlertDescription>
                There was a problem fetching the data for this section. The content might be temporarily unavailable. Please try refreshing the page later.
            </AlertDescription>
        </Alert>
    );
}


export default function Home() {
    const [projects, setProjects] = useState<Project[] | null>(null);
    const [testimonials, setTestimonials] = useState<Testimonial[] | null>(null);
    const [heroImage, setHeroImage] = useState<string | null>(null);
    const [logoUrl, setLogoUrl] = useState<string | null>(null);
    const [error, setError] = useState<Error | null>(null);
    
    const [projectsError, setProjectsError] = useState(false);
    const [testimonialsError, setTestimonialsError] = useState(false);

    useEffect(() => {
        async function loadData() {
            try {
                const [heroImageData, logoUrlData] = await Promise.all([
                    getSetting('heroImage'),
                    getSetting('logo'),
                ]);
                setHeroImage(heroImageData);
                setLogoUrl(logoUrlData);

                getProjects().then(setProjects).catch(() => {
                    console.error("Failed to fetch projects");
                    setProjectsError(true)
                });
                getTestimonials().then(setTestimonials).catch(() => {
                    console.error("Failed to fetch testimonials");
                    setTestimonialsError(true)
                });

            } catch (e: any) {
                console.error("Failed to load page settings", e);
                setError(e);
            }
        }
        loadData();
    }, []);

    if (error) {
        if (error.message.includes('no such table')) {
            return <DbUninitializedError />;
        }
        // Render a full-page error if critical settings fail
        return (
             <div className="flex min-h-screen w-full items-center justify-center bg-background p-4">
                <DataError sectionName="Homepage Content" />
             </div>
        )
    }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero heroImage={heroImage ?? placeholderImages.hero.imageUrl} logoUrl={logoUrl} />
        <ProspectsBanner logoUrl={logoUrl} />

        <section id="portfolio" className="py-20 lg:py-32">
            <div className="container mx-auto px-4">
              <div className="mx-auto mb-16 max-w-3xl text-center">
                <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  2025 Innovation Suite
                </h2>
                <p className="mt-4 text-lg text-zinc-500">
                  Showcasing our next generation of African-built digital solutions designed to
                  tackle global challenges.
                </p>
              </div>
              <div>
                {projectsError 
                    ? <DataError sectionName="Portfolio" /> 
                    : projects ? <BentoPortfolio projects={projects} /> : <PortfolioSkeleton />}
              </div>
            </div>
          </section>

        {testimonialsError 
            ? (
                <section id="testimonials" className="bg-background py-20 lg:py-32">
                    <div className="container">
                        <DataError sectionName="Testimonials" />
                    </div>
                </section>
            )
            : testimonials ? <TestimonialsComponent testimonials={testimonials} /> : (
                <section id="testimonials" className="bg-background py-20 lg:py-32">
                    <div className="container">
                        <TestimonialsSkeleton />
                    </div>
                </section>
            )
        }
        
        <section id="faq" className="border-t bg-background py-20 lg:py-32">
            <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
                <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                Frequently Asked Questions
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                Have questions? We've got answers. If you can't find what you're looking for, feel
                free to contact us.
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
      </main>
      <Footer />
    </div>
  );
}
