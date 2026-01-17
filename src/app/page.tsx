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

export default async function Home() {
  try {
    const projects = await getProjects();
    const testimonials = await getTestimonials();
    const heroImage = await getSetting('heroImage');

    return (
      <div className="flex min-h-screen flex-col bg-background">
        <Header />
        <main className="flex-1">
          <Hero heroImage={heroImage ?? placeholderImages.hero.imageUrl} />
          <ProspectsBanner />

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
                <BentoPortfolio projects={projects} />
              </div>
            </div>
          </section>

          <TestimonialsComponent testimonials={testimonials} />

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

          <Cta />
        </main>
        <Footer />
      </div>
    );
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return <DbUninitializedError />;
    }
    // Handle other errors if necessary, or rethrow
    throw error;
  }
}
