'use client';
import { Button } from '@/components/ui/button';
import { motion } from 'framer-motion';
import { ArrowRight } from 'lucide-react';
import { InquirySheet } from './inquiry-sheet';

export function Cta() {
  return (
    <section id="contact" className="py-20 lg:py-24">
      <div className="container mx-auto px-4">
        <motion.div
          initial={{ opacity: 0, y: 50 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.5 }}
          transition={{ duration: 0.5 }}
          className="relative overflow-hidden rounded-2xl bg-gradient-to-r from-primary to-secondary p-8 text-center md:p-12"
        >
          <div className="relative z-10">
            <h2 className="font-headline text-3xl font-extrabold text-white sm:text-4xl">
              Have a project in mind?
            </h2>
            <p className="mx-auto mt-4 max-w-2xl text-lg text-primary-foreground/80">
              Let's build the next generation of digital solutions together. We're ready to turn
              your vision into a global success story.
            </p>
            <div className="mt-8">
              <InquirySheet>
                <Button
                  size="lg"
                  variant="outline"
                  className="border-white bg-transparent text-white hover:bg-white hover:text-primary"
                >
                  Start a Conversation <ArrowRight className="ml-2 h-5 w-5" />
                </Button>
              </InquirySheet>
            </div>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
