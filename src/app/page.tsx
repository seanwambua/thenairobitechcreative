'use client';

import React, { useEffect, useCallback } from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Hero } from '@/components/hero';
import { ProspectsBanner } from '@/components/prospects-banner';
import { BentoPortfolio } from '@/components/bento-portfolio';
import { faqs, type Project, type Testimonial } from '@/lib/data';
import { Cta } from '@/components/cta';
import { Testimonials as TestimonialsComponent } from '@/components/testimonials';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import { motion } from 'framer-motion';
import { useMediaStore } from '@/store/media';
import { useBroadcastListener, type BroadcastMessage } from '@/hooks/use-broadcast';
import { getProjects } from '@/app/actions/projects';
import { getTestimonials } from '@/app/actions/testimonials';

export default function Home() {
  const { heroImage, setHeroImage } = useMediaStore();
  const [projects, setProjects] = React.useState<Project[]>([]);
  const [testimonials, setTestimonials] = React.useState<Testimonial[]>([]);

  const fetchAllData = useCallback(async () => {
    const [projectsData, testimonialsData] = await Promise.all([
      getProjects(),
      getTestimonials(),
    ]);
    setProjects(projectsData);
    setTestimonials(testimonialsData);
  }, []);
  
  useEffect(() => {
    fetchAllData();
  }, [fetchAllData]);

  const handleBroadcastMessage = useCallback((message: BroadcastMessage<any>) => {
    switch (message.type) {
      case 'refetch-projects':
      case 'refetch-testimonials':
        fetchAllData();
        break;
      case 'update-media':
        if (message.payload?.heroImage) {
          setHeroImage(message.payload.heroImage);
        }
        break;
    }
  }, [fetchAllData, setHeroImage]);

  useBroadcastListener(handleBroadcastMessage);

  const sectionVariants = {
    hidden: { opacity: 0, y: 50 },
    visible: { opacity: 1, y: 0, transition: { duration: 0.6, ease: 'easeOut' } },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <Hero heroImage={heroImage} />
        <ProspectsBanner />

        <motion.section
          id="portfolio"
          className="py-20 lg:py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
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
        </motion.section>

        <TestimonialsComponent testimonials={testimonials} />

        <motion.section
          id="faq"
          className="border-t bg-background py-20 lg:py-32"
          variants={sectionVariants}
          initial="hidden"
          whileInView="visible"
          viewport={{ once: true, amount: 0.2 }}
        >
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
                {faqs.map((faq, index) => (
                  <motion.div
                    key={faq.id}
                    variants={{
                      hidden: { opacity: 0, y: 20 },
                      visible: { opacity: 1, y: 0 },
                    }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <AccordionItem value={`item-${faq.id}`}>
                      <AccordionTrigger className="text-left font-semibold hover:no-underline">
                        {faq.question}
                      </AccordionTrigger>
                      <AccordionContent className="text-muted-foreground">
                        {faq.answer}
                      </AccordionContent>
                    </AccordionItem>
                  </motion.div>
                ))}
              </Accordion>
            </div>
          </div>
        </motion.section>

        <Cta />
      </main>
      <Footer />
    </div>
  );
}
