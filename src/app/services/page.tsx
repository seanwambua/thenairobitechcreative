'use client';
import * as React from 'react';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { services, processSteps } from '@/lib/data';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
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
  Plus,
  Check,
} from 'lucide-react';
import { Avatar, AvatarFallback } from '@/components/ui/avatar';
import {
  HoverCard,
  HoverCardContent,
  HoverCardTrigger,
} from '@/components/ui/hover-card';
import { placeholderImages } from '@/lib/placeholder-images';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { InquirySheet } from '@/components/inquiry-sheet';

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
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  const founderImage = placeholderImages.founder;
  const founderInitials = founderImage.imageHint
    .split(' ')
    .map((n) => n[0])
    .join('');

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-24">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 flex max-w-4xl flex-col items-center justify-center gap-6 text-center md:flex-row md:text-left">
              <div className="flex-1">
                <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                  Our Services & Philosophy
                </h1>
                <p className="mt-4 text-lg text-muted-foreground">
                  We blend strategy, design, and engineering to transform your vision into a
                  reality that thrives.
                </p>
              </div>
              <HoverCard>
                <HoverCardTrigger asChild>
                  <div className="group relative">
                    <Avatar className="h-24 w-24 cursor-pointer transition-all duration-300 md:h-32 md:w-32">
                      <AvatarFallback>{founderInitials}</AvatarFallback>
                    </Avatar>
                    <div className="absolute bottom-0 right-0 flex h-8 w-8 items-center justify-center rounded-full border-2 border-background bg-primary text-primary-foreground shadow-lg transition-transform duration-300 group-hover:scale-125">
                      <Plus className="h-4 w-4" />
                    </div>
                  </div>
                </HoverCardTrigger>
                <HoverCardContent className="w-80">
                  <div className="flex flex-col gap-4">
                    <div className="flex justify-between space-x-4">
                      <Avatar>
                        <AvatarFallback>{founderInitials}</AvatarFallback>
                      </Avatar>
                      <div className="space-y-1">
                        <h4 className="text-sm font-semibold">A Message from the Founder</h4>
                      </div>
                    </div>
                    <Separator />
                    <div className="text-sm text-muted-foreground">
                      <p className="mb-2">
                        "At The Nairobi Tech Creative, we believe in the power of African innovation
                        to solve global problems. We are not just building software; we are crafting
                        digital solutions that empower communities, drive growth, and create lasting
                        impact."
                      </p>
                      <p className="mb-1 font-semibold text-foreground">Our Mission</p>
                      <p className="mb-2">
                        To empower African businesses and entrepreneurs with world-class digital
                        products.
                      </p>
                      <p className="mb-1 font-semibold text-foreground">Our Vision</p>
                      <p>To be the leading catalyst for digital transformation in Africa.</p>
                    </div>
                  </div>
                </HoverCardContent>
              </HoverCard>
            </div>

            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
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
                    <Card
                      className={`flex h-full flex-col p-6 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10`}
                    >
                      <CardHeader className="flex-row items-center gap-4 p-0">
                        <div className="flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-2xl bg-primary/10 text-primary">
                          {Icon && <Icon className="h-6 w-6" />}
                        </div>
                        <CardTitle className="font-headline text-xl font-semibold text-foreground">
                          {service.title}
                        </CardTitle>
                      </CardHeader>
                      <CardContent className="flex flex-1 flex-col p-0 pt-4">
                        <p className="flex-1 text-muted-foreground">{service.description}</p>
                        <div className="my-6">
                            <div className="flex items-baseline">
                                {service.price !== 'Custom' && (
                                <span className="mr-2 text-sm font-medium text-muted-foreground">Starting from</span>
                                )}
                                <span className="font-headline text-4xl font-extrabold tracking-tight">
                                {service.price}
                                </span>
                                <span className="ml-1 text-sm font-medium text-muted-foreground">
                                {service.priceSuffix}
                                </span>
                            </div>
                        </div>
                        <ul className="space-y-3">
                            {service.features.map((feature) => (
                            <li key={feature} className="flex items-start">
                                <Check className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                                <span className="text-muted-foreground">{feature}</span>
                            </li>
                            ))}
                        </ul>
                      </CardContent>
                      <CardFooter className="p-0 pt-6">
                        <InquirySheet>
                            <Button
                            className="w-full"
                            variant='outline'
                            >
                            Get Started
                            </Button>
                        </InquirySheet>
                      </CardFooter>
                    </Card>
                  </motion.div>
                );
              })}
            </div>
            <p className="mt-8 text-center text-sm text-muted-foreground">
              *All prices are estimates. Final costs may vary depending on project requirements.
            </p>
          </div>
        </section>

        <section className="border-t py-20 lg:py-24">
          <div className="container mx-auto max-w-3xl px-4">
            <div className="relative mx-auto mb-16 text-center">
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
