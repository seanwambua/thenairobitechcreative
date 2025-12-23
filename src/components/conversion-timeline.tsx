'use client';

import { useRef } from 'react';
import { motion, useScroll, useTransform } from 'framer-motion';
import type { VentureMetrics } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Rocket, Milestone, Users, BarChart } from 'lucide-react';

interface ConversionTimelineProps {
    ventures: VentureMetrics[];
}

const getIcon = (title: string) => {
    if (title.toLowerCase().includes('client') || title.toLowerCase().includes('customer') || title.toLowerCase().includes('user')) return <Users className="h-5 w-5 text-secondary-foreground" />;
    if (title.toLowerCase().includes('revenue') || title.toLowerCase().includes('milestone')) return <BarChart className="h-5 w-5 text-secondary-foreground" />;
    if (title.toLowerCase().includes('mvp') || title.toLowerCase().includes('prototype')) return <Rocket className="h-5 w-5 text-secondary-foreground" />;
    return <Milestone className="h-5 w-5 text-secondary-foreground" />;
}

export function ConversionTimeline({ ventures }: ConversionTimelineProps) {
  const targetRef = useRef<HTMLDivElement | null>(null);
  const { scrollYProgress } = useScroll({
    target: targetRef,
    offset: ['start end', 'end start'],
  });

  // This will make the line draw itself as we scroll past the section
  const pathLength = useTransform(scrollYProgress, [0.1, 0.8], [0, 1]);

  return (
    <div className="grid grid-cols-1 gap-16 md:grid-cols-2">
      {ventures.map((venture, vIndex) => (
        <div key={vIndex} className="flex flex-col items-center">
            <h3 className="mb-8 font-headline text-2xl font-semibold text-primary">{venture.startupName}</h3>
            <div ref={targetRef} className="relative w-full max-w-sm">
                <div className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2 bg-border" />
                <svg
                    className="absolute left-4 top-0 h-full w-0.5 -translate-x-1/2"
                    width="2"
                    height="100%"
                    viewBox="0 0 2 1000" // Generic large height
                    preserveAspectRatio="none"
                >
                    <motion.path
                    d="M 1 0 V 1000"
                    fill="none"
                    stroke="hsl(var(--primary))"
                    strokeWidth="2"
                    style={{ pathLength }}
                    />
                </svg>
                <div className="space-y-12">
                    {venture.timeline.map((event, index) => (
                    <motion.div
                        key={index}
                        initial={{ opacity: 0, x: 20 }}
                        whileInView={{ opacity: 1, x: 0 }}
                        viewport={{ once: true, amount: 0.5 }}
                        transition={{ duration: 0.5, delay: 0.1 * index }}
                        className="relative flex items-start gap-4"
                    >
                        <div className="flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full bg-secondary">
                        {getIcon(event.title)}
                        </div>
                        <div className="w-full">
                            <Card className="bg-background/80 backdrop-blur-sm">
                            <CardHeader>
                                <CardTitle className="text-base font-semibold text-secondary">Day {event.day}</CardTitle>
                                <p className="font-headline text-lg font-bold">{event.title}</p>
                            </CardHeader>
                            <CardContent>
                                <p className="text-sm text-muted-foreground">{event.description}</p>
                            </CardContent>
                            </Card>
                        </div>
                    </motion.div>
                    ))}
                </div>
            </div>
        </div>
      ))}
    </div>
  );
}
