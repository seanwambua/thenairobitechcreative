'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { services, processSteps } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cta } from '@/components/cta';
import {
  Accordion,
  AccordionContent,
  AccordionItem,
  AccordionTrigger,
} from '@/components/ui/accordion';
import {
  type Icon as LucideIcon,
  Briefcase,
  Computer,
  Wrench,
  ScanSearch,
  LayoutTemplate,
  Rocket,
  Scaling,
  ServerCog,
} from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  ScanSearch,
  Rocket,
  Scaling,
  Briefcase,
  Computer,
  Wrench,
  ServerCog,
  LayoutTemplate,
};

export default function ServicesPage() {
  const founderImage = placeholderImages.founder;

  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Our Services & Philosophy
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                We blend strategy, design, and engineering to transform your vision into a reality
                that thrives.
              </p>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {/* Service Offerings */}
              {services.map((service, index) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={service.id}
                    variants={cardVariants}
                    initial="hidden"
                    whileInView="visible"
                    viewport={{ once: true, amount: 0.2 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="flex h-full flex-col p-6 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10">
                      <CardHeader className="p-0">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          {Icon && <Icon className="h-8 w-8" />}
                        </div>
                        <CardTitle className="font-headline text-2xl font-semibold text-foreground">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1 p-0 pt-4">
                        <p className="text-muted-foreground">{service.description}</p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}

              {/* Founder Quote & Vision */}
              <motion.div
                className="lg:col-span-2"
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.1 }}
              >
                <Card className="flex h-full flex-col items-center justify-center bg-muted/50 p-8 text-center lg:p-12">
                  <h2 className="font-headline text-2xl font-extrabold tracking-tight text-foreground sm:text-3xl">
                    From the Founder
                  </h2>
                  <blockquote className="mt-4 max-w-lg text-lg italic text-muted-foreground">
                    "Our journey began with a simple belief: that African ingenuity can solve
                    global problems. We are not just building software; we are building bridges and
                    crafting a new narrative for technology made in Africa."
                  </blockquote>
                </Card>
              </motion.div>

              {/* Founder Image */}
              <motion.div
                variants={cardVariants}
                initial="hidden"
                whileInView="visible"
                viewport={{ once: true, amount: 0.2 }}
                transition={{ duration: 0.5, delay: 0.2 }}
              >
                <Card className="relative h-full min-h-[250px] w-full overflow-hidden">
                  <Image
                    src={founderImage.imageUrl}
                    alt="Founder of The Nairobi Tech Creative"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 33vw"
                    data-ai-hint={founderImage.imageHint}
                  />
                </Card>
              </motion.div>
            </div>
          </div>
        </section>

        <section className="border-t py-20 lg:py-24">
          <div className="container mx-auto max-w-3xl px-4">
             <div className="mx-auto mb-16 text-center">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                How We Do It
              </h2>
              <p className="mt-3 text-lg text-muted-foreground">
                Our collaborative process ensures we build the right thing, the right way.
              </p>
            </div>
            
            <Accordion type="single" collapsible className="w-full">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.2 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <AccordionItem value={`item-${index}`}>
                    <AccordionTrigger className="text-left text-lg font-semibold hover:no-underline">
                      <div className="flex items-center gap-4">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-secondary/10 text-secondary">
                          {React.createElement(iconMap[step.icon as keyof typeof iconMap], {
                            className: 'h-6 w-6',
                          })}
                        </div>
                        {step.title}
                      </div>
                    </AccordionTrigger>
                    <AccordionContent className="pl-16 text-base text-muted-foreground">
                      {step.description}
                    </AccordionContent>
                  </AccordionItem>
                </motion.div>
              ))}
            </Accordion>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </div>
  );
}
