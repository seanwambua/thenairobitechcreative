'use client';

import { Button } from '@/components/ui/button';
import { motion, AnimatePresence } from 'framer-motion';
import { ArrowRight, X } from 'lucide-react';
import { InquirySheet } from './inquiry-sheet';
import { useState, useEffect } from 'react';

export function ProspectsBanner() {
  const [isVisible, setIsVisible] = useState(true);
  const [mounted, setMounted] = useState(false);
  useEffect(() => {
    setMounted(true);
  }, []);

  const bannerVariants = {
    hidden: { y: '100%' },
    visible: {
      y: 0,
      transition: { type: 'spring', stiffness: 100, damping: 20, delay: 2 },
    },
    exit: { y: '100%', transition: { type: 'tween', duration: 0.3 } },
  };

  if (!isVisible) return null;

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-40 w-full"
        >
          <div className="relative h-[40vh] w-full border-t bg-muted/90 p-8 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close banner</span>
            </Button>
            <div className="container mx-auto flex h-full flex-col items-center justify-center text-center">
              <div>
                <h2 className="font-headline text-2xl font-bold text-foreground sm:text-3xl">
                  Now accepting 2026 projects
                </h2>
                <p className="mt-2 text-muted-foreground">
                  Looking to step into the digital space? Lets connect and
                  explore what best works for you
                </p>
              </div>
              <div className="mt-6">
                {mounted ? (
                  <InquirySheet>
                    <Button size="lg" className="flex-shrink-0">
                      Inquire Now <ArrowRight className="ml-2 h-5 w-5" />
                    </Button>
                  </InquirySheet>
                ) : (
                  <Button size="lg" className="flex-shrink-0">
                    Inquire Now <ArrowRight className="ml-2 h-5 w-5" />
                  </Button>
                )}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
