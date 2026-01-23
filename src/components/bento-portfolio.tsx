'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project, IconName } from '@/lib/data';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';
import {
  Boxes,
  BookOpen,
  PenTool,
  LineChart,
  Globe,
  Server,
  ScanSearch,
  LayoutTemplate,
  Rocket,
  Scaling,
  Briefcase,
  Computer,
  Wrench,
  ServerCog,
  Star,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';
import { placeholderImages } from '@/lib/placeholder-images';

const icons: Record<IconName, ComponentType<LucideProps>> = {
  Boxes,
  BookOpen,
  PenTool,
  LineChart,
  Globe,
  Server,
  ScanSearch,
  LayoutTemplate,
  Rocket,
  Scaling,
  Briefcase,
  Computer,
  Wrench,
  ServerCog,
  Star,
};

interface BentoPortfolioProps {
  projects: Project[];
  logoUrl: string | null;
}

export function BentoPortfolio({ projects, logoUrl }: BentoPortfolioProps) {
  return (
    <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
      {projects.map((project, index) => {
        const Icon = icons[project.icon];
        const hasProjectImage = !!project.imageUrl;
        const imageSrc =
          project.imageUrl || logoUrl || placeholderImages.logo.imageUrl;
        const imageClassName = hasProjectImage
          ? 'object-cover'
          : 'object-contain p-8';
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
              <div className="relative h-48 w-full bg-muted">
                <Image
                  src={imageSrc}
                  alt={project.title}
                  fill
                  className={imageClassName}
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  data-ai-hint={
                    hasProjectImage ? project.imageHint : 'logo'
                  }
                />
              </div>
              <CardHeader className="flex-row items-start gap-4">
                {Icon && (
                  <Icon className="h-10 w-10 flex-shrink-0 text-primary" />
                )}
                <CardTitle className="font-headline text-2xl font-semibold text-foreground">
                  {project.title}
                </CardTitle>
              </CardHeader>
              <CardContent className="flex flex-1 flex-col justify-between">
                <p className="mb-4 text-muted-foreground">
                  {project.description}
                </p>
                <div className="flex flex-wrap gap-2">
                  {project.keyFeatures.map((feature) => (
                    <Badge key={feature} variant="secondary">
                      {feature}
                    </Badge>
                  ))}
                </div>
              </CardContent>
            </Card>
          </motion.div>
        );
      })}
    </div>
  );
}
