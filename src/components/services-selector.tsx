'use client';

import React from 'react';
import { useState } from 'react';
import { Server, GitMerge, Rocket, BrainCircuit, LifeBuoy, Users, ArrowRight } from 'lucide-react';
import { motion, AnimatePresence } from 'framer-motion';
import { ContactForm } from '@/components/contact-form';
import { Button } from '@/components/ui/button';

const services = [
  {
    icon: <BrainCircuit className="h-8 w-8 text-primary" />,
    title: 'Business Strategy & Tech Consulting',
    description: 'Aligning technology with your business goals. Ideal for founders and SMEs who need a technical IT partner.',
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
  {
    icon: <LifeBuoy className="h-8 w-8 text-primary" />,
    title: 'Technical Support',
    description: 'Reliable remote technical support to ensure your systems are always running smoothly. We offer fast and efficient solutions to keep your business operational.',
  },
  {
    icon: <Users className="h-8 w-8 text-primary" />,
    title: 'User Training',
    description: 'Empowering your team with the skills to effectively use your software and systems. We provide comprehensive training sessions tailored to your needs.',
  },
];

export function ServicesSelector() {
  const [selectedService, setSelectedService] = useState(services[0]);
  const [showForm, setShowForm] = useState(false);

  const handleServiceSelect = (service: typeof services[0]) => {
    setSelectedService(service);
    setShowForm(false);
  }

  return (
    <div className="bg-muted/20 border rounded-xl p-4 sm:p-8">
      <div className="text-center mb-12">
        <h2 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
          Our Services
        </h2>
        <p className="mt-4 max-w-3xl mx-auto text-lg text-muted-foreground">
          Select a service to learn more about how we can help your business.
        </p>
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="flex flex-col space-y-2">
            {services.map((service) => (
              <motion.div
                key={service.title}
                onHoverStart={() => handleServiceSelect(service)}
                whileHover={{ scale: 1.02, x: 5 }}
                transition={{ type: 'spring', stiffness: 400, damping: 10 }}
                className="origin-left"
              >
                <Button
                  variant={selectedService.title === service.title ? 'default' : 'ghost'}
                  className="w-full justify-start h-auto py-4 px-4 text-left"
                >
                  <div className="flex items-start">
                    <div className="mr-4 flex-shrink-0">{service.icon}</div>
                    <span className="min-w-0 text-base font-medium">{service.title}</span>
                  </div>
                </Button>
              </motion.div>
            ))}
          </div>
        </div>
        <div className="lg:col-span-2">
          <AnimatePresence mode="wait">
            <motion.div
              key={selectedService.title}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, y: -20 }}
              transition={{ duration: 0.3 }}
              className="bg-background/50 border rounded-lg p-8 h-full"
            >
                <div>
                  <h2 className="text-3xl font-bold mb-4">{selectedService.title}</h2>
                  <p className="text-muted-foreground mb-8 text-lg">{selectedService.description}</p>
                  
                  {!showForm && (
                    <Button size="lg" onClick={() => setShowForm(true)}>
                      Interested? Let's talk <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  )}

                  <AnimatePresence>
                    {showForm && (
                      <motion.div
                        initial={{ opacity: 0, y: 10 }}
                        animate={{ opacity: 1, y: 0 }}
                        exit={{ opacity: 0, y: 10 }}
                        transition={{ duration: 0.3 }}
                      >
                        <h3 className="text-2xl font-bold mb-6">Interested? Let's talk.</h3>
                        <ContactForm subject={selectedService.title} />
                      </motion.div>
                    )}
                  </AnimatePresence>
                </div>
            </motion.div>
          </AnimatePresence>
        </div>
      </div>
    </div>
  );
}
