'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import { timeline } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { CheckCircle } from 'lucide-react';

export default function ConversionTimeline() {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <div ref={targetRef} className="relative mx-auto w-full max-w-3xl">
      <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-border md:left-1/2" />
      <svg
        className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 md:left-1/2"
        width="2"
        height="100%"
        viewBox="0 0 2 1500" // Adjust height if needed
        preserveAspectRatio="none"
      >
        <motion.path
          d="M 1 0 V 1500"
          fill="none"
          stroke="var(--primary)"
          strokeWidth="2"
          style={{ pathLength, stroke: 'hsl(var(--primary))' }}
        />
      </svg>
      <div className="space-y-12">
        {timeline.map((event, index) => (
          <motion.div
            key={index}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.5 }}
            transition={{ duration: 0.5, delay: 0.1 * index }}
            className="relative flex items-start gap-4 md:gap-8"
          >
            <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-primary md:absolute md:left-1/2 md:top-0 md:-translate-x-1/2">
              <CheckCircle className="h-5 w-5 text-primary-foreground" />
            </div>
            <div className="w-full pl-4 md:w-1/2 md:pl-0 md:text-right">
              {index % 2 === 1 && (
                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-primary">Day {event.day}</CardTitle>
                    <p className="font-headline text-xl font-bold">{event.title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              )}
            </div>
            <div className="hidden w-1/2 md:block">
              {index % 2 === 0 && (
                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-primary">Day {event.day}</CardTitle>
                    <p className="font-headline text-xl font-bold">{event.title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
              )}
            </div>
             <div className="w-full pl-4 md:hidden">
                <Card className="bg-card/80 backdrop-blur-sm">
                  <CardHeader>
                    <CardTitle className="text-lg font-semibold text-primary">Day {event.day}</CardTitle>
                    <p className="font-headline text-xl font-bold">{event.title}</p>
                  </CardHeader>
                  <CardContent>
                    <p className="text-muted-foreground">{event.description}</p>
                  </CardContent>
                </Card>
            </div>
          </motion.div>
        ))}
      </div>
    </div>
  );
}
