'use client';
import { pricingPlans } from '@/lib/data';
import { motion } from 'framer-motion';
import {
  Card,
  CardContent,
  CardFooter,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { Check } from 'lucide-react';
import { InquirySheet } from '@/components/inquiry-sheet';

export function PricingClient({ logoUrl }: { logoUrl: string | null }) {
  const cardVariants = {
    hidden: { opacity: 0, y: 30 },
    visible: { opacity: 1, y: 0 },
  };

  return (
    <section className="py-20 lg:py-32">
      <div className="container mx-auto px-4">
        <div className="mx-auto mb-16 max-w-3xl text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
            Our Pricing
          </h1>
          <p className="mt-4 text-lg text-muted-foreground">
            Choose the plan that best fits your project needs. We offer flexible
            options to get you started.
          </p>
        </div>
        <div className="mx-auto grid max-w-4xl grid-cols-1 gap-8 md:grid-cols-2">
          {pricingPlans.map((plan, index) => (
            <motion.div
              key={plan.id}
              variants={cardVariants}
              initial="hidden"
              whileInView="visible"
              viewport={{ once: true, amount: 0.2 }}
              transition={{ duration: 0.5, delay: index * 0.1 }}
            >
              <Card
                className={`flex h-full flex-col p-6 transition-all duration-300 hover:border-primary hover:shadow-xl hover:shadow-primary/10`}
              >
                <CardHeader className="p-0">
                  <CardTitle className="font-headline text-xl font-semibold text-foreground">
                    {plan.title}
                  </CardTitle>
                </CardHeader>
                <CardContent className="flex flex-1 flex-col p-0 pt-4">
                  <p className="flex-1 text-muted-foreground">
                    {plan.description}
                  </p>
                  <div className="my-6">
                    <div className="flex items-baseline">
                      {plan.price !== 'Custom' && (
                        <span className="mr-2 text-sm font-medium text-muted-foreground">
                          Starting from
                        </span>
                      )}
                      <span className="font-headline text-4xl font-extrabold tracking-tight">
                        {plan.price !== 'Custom' && 'KES '}
                        {plan.price}
                      </span>
                      <span className="ml-1 text-sm font-medium text-muted-foreground">
                        {plan.priceSuffix}
                      </span>
                    </div>
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
                <CardFooter className="p-0 pt-6">
                  <InquirySheet logoUrl={logoUrl}>
                    <Button
                      className="w-full"
                      variant={plan.id === 2 ? 'default' : 'outline'}
                    >
                      Get Started
                    </Button>
                  </InquirySheet>
                </CardFooter>
              </Card>
            </motion.div>
          ))}
        </div>
        <p className="mt-8 text-center text-sm text-muted-foreground">
          *All prices are estimates. Final costs may vary depending on project
          requirements.
        </p>
      </div>
    </section>
  );
}
