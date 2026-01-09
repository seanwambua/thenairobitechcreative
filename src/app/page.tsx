'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/hero';
import { BentoPortfolio } from '@/components/bento-portfolio';
import { projects, testimonials, faqs } from '@/lib/data';
import { Cta } from '@/components/cta';
import { Testimonials } from '@/components/testimonials';
import { placeholderImages } from '@/lib/placeholder-images';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';

export default function Home() {
  const heroImageDataUri = placeholderImages.hero.imageUrl;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero heroImage={heroImageDataUri} />

        <section id="portfolio" className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                2025 Innovation Suite
              </h2>
              <p className="mt-4 text-lg text-zinc-500">
                Showcasing our next generation of African-built digital solutions designed to
                tackle global challenges.
              </p>
            </div>
            <BentoPortfolio projects={projects} />
          </div>
        </section>

        <Testimonials testimonials={testimonials} />

        <section id="faq" className="border-t bg-background py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
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
}
