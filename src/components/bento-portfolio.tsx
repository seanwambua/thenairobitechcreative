'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project, IconName } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import { Boxes, BookOpen, PenTool, LineChart, Globe, Server, type LucideProps } from 'lucide-react';
import type { ComponentType } from 'react';

const icons: Record<IconName, ComponentType<LucideProps>> = {
  Boxes,
  BookOpen,
  PenTool,
  LineChart,
  Globe,
  Server,
};

interface BentoPortfolioProps {
  projects: Project[];
}

export function BentoPortfolio({ projects }: BentoPortfolioProps) {
  return (
    <div className="grid grid-cols-1 gap-4 md:grid-cols-3">
      {projects.map((project, index) => {
        const Icon = icons[project.icon];
        return (
          <motion.div
            key={project.id}
            className={cn(project.gridSpan)}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.1 }}
          >
            <Card className="flex h-full flex-col overflow-hidden transition-all duration-300 hover:shadow-2xl hover:shadow-primary/20">
              <div className="relative h-60 w-full">
                <Image
                    src={project.imageUrl}
                    alt={project.title}
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                    data-ai-hint={project.imageHint}
                  />
              </div>
              <CardHeader className="flex-row items-start gap-4">
                 {Icon && <Icon className="h-10 w-10 text-primary flex-shrink-0" />}
                 <CardTitle className="font-headline text-2xl font-semibold text-foreground">{project.title}</CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <p className="mb-4 text-muted-foreground">{project.description}</p>
                <div className="flex flex-wrap gap-2">
                  {project.keyFeatures.map((feature) => (
                    <Badge key={feature} variant="secondary">{feature}</Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        )
      })}
    </div>
  );
}
