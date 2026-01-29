'use client';
import Image from 'next/image';
import { motion } from 'framer-motion';
import type { Project, IconName } from '@/lib/data';
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
  ShieldCheck,
  type LucideProps,
} from 'lucide-react';
import type { ComponentType } from 'react';
import placeholderImages from '@/app/lib/placeholder-images.json';
import { z } from 'zod';
import { ProjectSchema } from '@/lib/schemas';

const BentoPortfolioSchema = z.array(ProjectSchema);

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
  ShieldCheck,
};

interface BentoPortfolioProps {
  projects: Project[];
}

export function BentoPortfolio({ projects }: BentoPortfolioProps) {
  const validation = BentoPortfolioSchema.safeParse(projects);

  if (!validation.success) {
    console.error('Invalid projects prop:', validation.error.flatten());
    return (
      <div className="rounded-2xl bg-destructive/10 p-6 text-destructive">
        <h3 className="font-headline text-2xl font-bold">Validation Error</h3>
        <p className="mt-2 text-sm">
          The data provided for the portfolio is invalid. Please check the
          console for more details.
        </p>
      </div>
    );
  }
  return (
    <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3">
      {validation.data.map((project, index) => {
        const Icon = icons[project.icon];
        const hasProjectImage = !!project.imageUrl;

        return (
          <motion.div
            key={project.id}
            className={cn(
              'group relative flex min-h-96 flex-col justify-end overflow-hidden rounded-2xl',
              project.gridSpan
            )}
            initial={{ opacity: 0, y: 50 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true, amount: 0.2 }}
            transition={{ duration: 0.5, delay: index * 0.05 }}
          >
            <div className="absolute inset-0 z-0">
              <Image
                src={project.imageUrl}
                alt={project.title}
                fill
                className="object-cover transition-transform duration-500 group-hover:scale-105"
                sizes="(max-width: 768px) 100vw, (max-width: 1200px) 50vw, 33vw"
                data-ai-hint={hasProjectImage ? project.imageHint : 'logo'}
                unoptimized={!hasProjectImage}
              />
            </div>
            <div className="absolute inset-0 z-10 bg-gradient-to-t from-black/100 via-black/60 to-transparent" />
            <div className="relative z-20 flex flex-col gap-3 p-6 text-white">
              <div className="flex items-center gap-3">
                {Icon && (
                  <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-white/10 p-2 backdrop-blur-sm">
                    <Icon className="h-6 w-6" />
                  </div>
                )}
                <h3 className="font-headline text-2xl font-bold">
                  {project.title}
                </h3>
              </div>
              <p className="text-sm text-white/80">{project.description}</p>
              <div className="mt-2 flex flex-wrap gap-2">
                {project.keyFeatures.map((feature) => (
                  <Badge
                    key={feature}
                    variant="secondary"
                    className="border-transparent bg-white/10 text-white backdrop-blur-sm"
                  >
                    {feature}
                  </Badge>
                ))}
              </div>
            </div>
          </motion.div>
        );
      })}
    </div>
  );
}
