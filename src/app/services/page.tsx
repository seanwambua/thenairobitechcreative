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
} from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  Briefcase,
  Computer,
  Wrench,
};

const processSteps = [
  {
    icon: ScanSearch,
    title: 'Discovery & Strategy',
    description: 'We start by understanding your vision, goals, and market landscape to build a comprehensive project roadmap.',
  },
  {
    icon: LayoutTemplate,
    title: 'Design & Prototyping',
    description: 'Our team creates intuitive UI/UX designs and interactive prototypes to visualize the end product and refine user flows.',
  },
  {
    icon: Rocket,
    title: 'Development & Launch',
    description: 'Using agile methodologies, we build, test, and deploy your solution, ensuring a seamless and successful launch.',
  },
  {
    icon: Scaling,
    title: 'Scaling & Support',
    description: 'After launch, we provide ongoing support, monitoring, and optimization to help you scale and adapt to new challenges.',
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
                We blend strategy, design, and engineering to transform your vision into a reality that thrives.
              </p>
            </div>
            
            {/* Service Offerings */}
            <div className="relative mx-auto max-w-3xl">
              <h2 className="text-center font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl mb-12">
                What We Do
              </h2>
              <div
                className="absolute left-1/2 top-0 -ml-[1px] h-full w-0.5 bg-border"
                aria-hidden="true"
              />
              {services.map((service, index) => {
                const Icon = iconMap[service.icon];
                const isLeft = index % 2 === 0;

                return (
                  <motion.div
                    key={service.id}
                    className="relative mb-12"
                    initial={{ opacity: 0, y: 50 }}
                    whileInView={{ opacity: 1, y: 0 }}
                    viewport={{ once: true, amount: 0.3 }}
                    transition={{ duration: 0.5 }}
                  >
                    <div className="flex items-center">
                      <div
                        className={`absolute left-1/2 top-1/2 -translate-x-1/2 -translate-y-1/2 transform`}
                      >
                        <div className="flex h-12 w-12 items-center justify-center rounded-full border-2 border-primary bg-background">
                          {Icon && <Icon className="h-6 w-6 text-primary" />}
                        </div>
                      </div>
                    </div>
                    <div
                      className={`relative w-[calc(50%-2.5rem)] rounded-lg border bg-card p-6 shadow-lg ${
                        isLeft ? 'mr-auto' : 'ml-auto'
                      }`}
                    >
                      <h3 className="font-headline text-xl font-semibold text-foreground">
                        {service.title}
                      </h3>
                      <p className="mt-2 text-muted-foreground">{service.description}</p>
                      <ul className="mt-4 space-y-2">
                        {service.details.map((detail) => (
                          <li key={detail} className="flex items-start">
                            <Check className="mr-2 mt-1 h-4 w-4 flex-shrink-0 text-primary" />
                            <span className="text-sm text-muted-foreground">{detail}</span>
                          </li>
                        ))}
                      </ul>
                    </div>
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
                Our Collaborative Process
              </h2>
              <p className="mt-4 text-lg text-muted-foreground">
                We follow a structured, transparent process to ensure your project's success from concept to launch and beyond.
              </p>
            </div>
            <div className="mx-auto grid max-w-5xl grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-4">
              {processSteps.map((step, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card className="h-full text-center">
                    <CardHeader>
                      <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-primary/10 text-primary">
                        <step.icon className="h-8 w-8" />
                      </div>
                    </CardHeader>
                    <CardContent>
                      <CardTitle className="font-headline text-xl font-semibold text-foreground">{step.title}</CardTitle>
                      <p className="mt-2 text-muted-foreground">{step.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
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
                  "Our journey began with a simple belief: that African ingenuity can solve global problems. We are not just building software; we are building bridges, empowering communities, and crafting a new narrative for technology made in Africa."
                </p>
                <div className="mt-8 space-y-6">
                  <div>
                    <h3 className="font-headline text-xl font-semibold text-primary">Our Mission</h3>
                    <p className="mt-2 text-muted-foreground">To empower businesses and creators with world-class digital solutions that are born from African insights and engineered for global impact.</p>
                  </div>
                  <div>
                    <h3 className="font-headline text-xl font-semibold text-primary">Our Vision</h3>
                    <p className="mt-2 text-muted-foreground">To be the leading catalyst for technological innovation in Africa, creating a sustainable ecosystem of talent and opportunity that resonates on a global scale.</p>
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
