'use client';

import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { pricingPlans } from '@/lib/data';
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { motion } from 'framer-motion';

export default function PricingPage() {
  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <section className="py-20 lg:py-32">
          <div className="container mx-auto px-4">
            <div className="mx-auto mb-16 max-w-3xl text-center">
              <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
                Find Your Perfect Plan
              </h1>
              <p className="mt-4 text-lg text-muted-foreground">
                Flexible pricing for teams of all sizes. Choose the plan that fits your needs and
                let's start building something amazing together.
              </p>
            </div>
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {pricingPlans.map((plan, index) => (
                <motion.div
                  key={plan.id}
                  initial={{ opacity: 0, y: 50 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true, amount: 0.3 }}
                  transition={{ duration: 0.5, delay: index * 0.1 }}
                >
                  <Card
                    className={`flex h-full flex-col ${
                      plan.recommended ? 'border-primary shadow-2xl shadow-primary/20' : ''
                    }`}
                  >
                    <CardHeader>
                      <CardTitle className="font-headline text-2xl font-semibold text-foreground">
                        {plan.title}
                      </CardTitle>
                      <CardDescription>{plan.description}</CardDescription>
                    </CardHeader>
                    <CardContent className="flex-1 space-y-4">
                      <div className="flex items-baseline">
                        <span className="font-headline text-4xl font-extrabold tracking-tight">
                          {plan.price}
                        </span>
                        <span className="ml-1 text-sm font-medium text-muted-foreground">
                          {plan.priceSuffix}
                        </span>
                      </div>
                      <ul className="space-y-3">
                        {plan.features.map((feature) => (
                          <li key={feature} className="flex items-start">
                            <Check className="mr-2 mt-1 h-5 w-5 flex-shrink-0 text-primary" />
                            <span className="text-muted-foreground">{feature}</span>
                          </li>
                        ))}
                      </ul>
                    </CardContent>
                    <CardFooter>
                      <Button
                        className="w-full"
                        variant={plan.recommended ? 'default' : 'outline'}
                      >
                        Get Started
                      </Button>
                    </CardFooter>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>
      </main>
      <Footer />
    </div>
  );
}
