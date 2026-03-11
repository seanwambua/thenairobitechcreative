'use client';

import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Server, GitMerge, Rocket, BrainCircuit } from 'lucide-react';
import { motion } from 'framer-motion';

const services = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Business Strategy & Tech Consulting',
    description: 'Aligning your technology decisions with your business goals. Ideal for founders and SMEs who need a technical thought partner, not just an executor.',
  },
  {
    icon: <Rocket className="h-8 w-8 text-primary" />,
    title: 'Product Development',
    description: 'Taking your idea from concept to shipped product. We help you define the right MVP, build it iteratively, and validate with real users before scaling.',
  },
  {
    icon: <Server className="h-8 w-8 text-primary" />,
    title: 'DevOps & Infrastructure',
    description: 'Setting up and managing CI/CD pipelines, cloud servers, VPS environments, and monitoring systems. Less downtime, faster deployments, and infrastructure that scales with your business.',
  },
  {
    icon: <GitMerge className="h-8 w-8 text-primary" />,
    title: 'Business Process Development',
    description: 'Mapping, streamlining, and automating the workflows that run your business. From helpdesk systems to internal tooling, we turn chaotic processes into repeatable, efficient systems.',
  },
];

export function ServicesClient() {
  return (
    <div className="bg-background text-foreground">
      <header className="bg-primary/5 text-center py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            Our Services
          </h1>
          <p className="mt-6 max-w-3xl mx-auto text-lg text-muted-foreground">
            We offer a range of services designed to help your business grow and thrive in the digital age.
          </p>
        </div>
      </header>

      <main className="container mx-auto px-4 py-12 md:px-6 md:py-20">
        <section id="services">
          <div className="grid gap-8 md:grid-cols-2">
            {services.map((service, index) => (
              <motion.div
                key={service.title}
                initial={{ opacity: 0, y: 50 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.5, delay: index * 0.2 }}
              >
                <Card className="flex flex-col items-center text-center p-6 h-full">
                  <CardHeader>
                    {service.icon}
                    <CardTitle className="mt-4 text-lg font-semibold">{service.title}</CardTitle>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{service.description}</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </section>
      </main>
    </div>
  );
}
