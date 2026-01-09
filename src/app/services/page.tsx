import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { services } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { motion } from 'framer-motion';
import { Check } from 'lucide-react';
import type { Icon as LucideIcon } from 'lucide-react';

const iconMap: { [key: string]: LucideIcon } = {
  ScanSearch: require('lucide-react').ScanSearch,
  LayoutTemplate: require('lucide-react').LayoutTemplate,
  Rocket: require('lucide-react').Rocket,
  Scaling: require('lucide-react').Scaling,
};

export default function ServicesPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Our Process
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                From concept to launch, we follow a structured process to ensure your vision comes
                to life, creating impactful and scalable solutions.
              </p>
            </div>
            <div className="relative mx-auto max-w-3xl">
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
      </main>
      <Footer />
    </div>
  );
}
