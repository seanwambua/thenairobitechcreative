'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { services } from '@/lib/data';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { placeholderImages } from '@/lib/placeholder-images';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Cta } from '@/components/cta';
import {
  Check,
  type Icon as LucideIcon,
  Briefcase,
  Computer,
  Wrench,
  ScanSearch,
  LayoutTemplate,
  Rocket,
  Scaling,
  ServerCog,
  ArrowDown,
  ArrowRight,
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

const processSteps = [
  {
    icon: ScanSearch,
    title: '1. Discover',
    description:
      'We start with collaborative workshops to deeply understand your vision, goals, and user needs, laying a strong strategic foundation.',
  },
  {
    icon: LayoutTemplate,
    title: '2. Define',
    description:
      'We translate insights into a concrete plan with user journeys, wireframes, and a clear project roadmap, ensuring full alignment before development begins.',
  },
  {
    icon: Rocket,
    title: '3. Develop',
    description:
      'Using an agile, sprint-based approach, our team builds, tests, and iterates on your product in rapid cycles, with regular demos to gather your feedback.',
  },
  {
    icon: Scaling,
    title: '4. Deploy',
    description:
      'We manage a seamless launch, from scalable cloud infrastructure to final QA. Post-launch, we provide ongoing support to ensure your product thrives.',
  },
];

export default function ServicesPage() {
  const founderImage = placeholderImages.founder;
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-32">
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

            {/* Service Offerings */}
            <div className="mx-auto max-w-4xl space-y-12">
              <h2 className="mb-12 text-center font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                What We Do
              </h2>
              {services.map((service, index) => {
                const Icon = iconMap[service.icon as keyof typeof iconMap];
                return (
                  <motion.div
                    key={service.id}
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="overflow-hidden transition-all duration-300 hover:border-primary hover:shadow-2xl hover:shadow-primary/10">
                      <div className="grid md:grid-cols-3">
                        <div className="flex flex-col items-center justify-center gap-4 border-b p-8 text-center md:border-b-0 md:border-r">
                          {Icon && <Icon className="h-16 w-16 text-primary" />}
                          <h3 className="font-headline text-2xl font-semibold text-foreground">
                            {service.title}
                          </h3>
                        </div>
                        <div className="p-8 md:col-span-2">
                          <p className="text-lg text-muted-foreground">{service.description}</p>
                          <ul className="mt-6 space-y-3">
                            {service.details.map((detail) => (
                              <li key={detail} className="flex items-start">
                                <Check className="mr-3 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                                <span className="text-foreground">{detail}</span>
                              </li>
                            ))}
                          </ul>
                        </div>
                      </div>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Our Process Section */}
        <section className="border-t bg-muted/50 py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                How We Do It: A Walkthrough
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We follow a structured, transparent process to ensure your project's success from
                concept to launch and beyond.
              </p>
            </div>
            <div className="relative mx-auto grid max-w-4xl gap-x-8 gap-y-12 md:grid-cols-2">
              {/* Connector Lines for Desktop */}
              <div className="absolute left-1/2 top-1/2 hidden h-1/2 w-px -translate-x-1/2 -translate-y-full bg-border md:block"></div>
              <div className="absolute left-1/2 top-1/2 hidden w-1/2 -translate-x-full border-t border-border md:block"></div>
              <div className="absolute left-1/2 top-1/2 hidden h-1/2 w-px -translate-x-1/2 translate-y-full bg-border md:block"></div>
              
              {processSteps.map((step, index) => {
                const Icon = step.icon;
                return (
                  <motion.div
                    key={index}
                    className="relative"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5, delay: index * 0.1 }}
                  >
                    <Card className="flex h-full flex-col">
                      <CardHeader className="items-center text-center">
                        <div className="mb-4 flex h-16 w-16 items-center justify-center rounded-full border-4 border-background bg-primary text-primary-foreground">
                          <Icon className="h-8 w-8" />
                        </div>
                        <CardTitle className="font-headline text-xl font-semibold text-primary">
                          {step.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex-1">
                        <p className="text-center text-muted-foreground">
                          {step.description}
                        </p>
                      </CardContent>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
          </div>
        </section>

        {/* Founder and Vision Section */}
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto grid max-w-5xl items-center gap-12 md:grid-cols-2 lg:gap-16">
              <motion.div
                initial={{ opacity: 0, x: -50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6 }}
              >
                <div className="relative h-[400px] w-full overflow-hidden rounded-2xl shadow-lg">
                  <Image
                    src={founderImage.imageUrl}
                    alt="Founder of The Nairobi Tech Creative"
                    fill
                    className="object-cover object-top"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    data-ai-hint={founderImage.imageHint}
                  />
                </div>
              </motion.div>
              <motion.div
                initial={{ opacity: 0, x: 50 }}
                whileInView={{ opacity: 1, x: 0 }}
                viewport={{ once: true, amount: 0.5 }}
                transition={{ duration: 0.6, delay: 0.2 }}
              >
                <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
                  From the Founder
                </h2>
                <p className="mt-4 text-lg text-muted-foreground">
                  "Our journey began with a simple belief: that African ingenuity can solve global
                  problems. We are not just building software; we are building bridges, empowering
                  communities, and crafting a new narrative for technology made in Africa."
                </p>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="font-headline text-xl font-semibold text-primary">
                      Our Mission
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      To empower businesses and creators with world-class digital solutions that are
                      born from African insights and engineered for global impact.
                    </p>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl font-semibold text-primary">
                      Our Vision
                    </h3>
                    <p className="mt-2 text-muted-foreground">
                      To be the leading catalyst for technological innovation in Africa, creating a
                      sustainable ecosystem of talent and opportunity that resonates on a global
                      scale.
                    </p>
                  </div>
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        <Cta />
      </main>
      <Footer />
    </div>
  );
}
