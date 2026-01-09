'use client';

import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import Link from 'next/link';

export function ProspectsBanner() {
  return (
    <section className="border-y bg-muted/30">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="flex flex-col items-center justify-between gap-6 rounded-lg p-8 text-center sm:flex-row sm:text-left"
        >
          <div>
            <h2 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
              Now Accepting 2026 Prospects
            </h2>
            <p className="mt-2 text-muted-foreground">
              Planning your next big project? Let's connect and explore how we can build the future,
              together.
            </p>
          </div>
          <Link href="/#contact">
            <Button size="lg" className="flex-shrink-0">
              Inquire Now <ArrowRight className="ml-2 h-5 w-5" />
            </Button>
          </Link>
        </motion.div>
      </div>
    </section>
  );
}
