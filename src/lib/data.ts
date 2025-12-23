import type { ComponentType } from 'react';
import { Boxes, BookOpen, PenTool, LineChart, Globe, Server, type LucideProps } from 'lucide-react';
import { placeholderImages } from './placeholder-images';

export type IconName = 'Boxes' | 'BookOpen' | 'PenTool' | 'LineChart' | 'Globe' | 'Server';

export interface Project {
  id: number;
  title: string;
  description: string;
  keyFeatures: string[];
  imageUrl: string;
  imageHint: string;
  gridSpan: string;
  icon: IconName;
}

export interface TimelineEvent {
  day: number;
  title: string;
  description:string;
}

export interface VentureMetrics {
    startupName: string;
    timeline: TimelineEvent[];
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Inventory Management',
    description: 'Real-time supply chain tracking with M-Pesa API integration for SMEs.',
    keyFeatures: ['Real-time Tracking', 'M-Pesa API', 'Automated Reordering'],
    imageUrl: placeholderImages.inventory.imageUrl,
    imageHint: placeholderImages.inventory.imageHint,
    gridSpan: 'col-span-1 md:col-span-1',
    icon: 'Boxes',
  },
  {
    id: 2,
    title: 'Graphic Design Workbench',
    description: 'Collaborative canvas for African creatives to build and share their work.',
    keyFeatures: ['Collaborative Canvas', 'Vector Tools', 'Asset Library'],
    imageUrl: placeholderImages.design.imageUrl,
    imageHint: placeholderImages.design.imageHint,
    gridSpan: 'col-span-1 md:col-span-2',
    icon: 'PenTool',
  },
  {
    id: 3,
    title: 'Financial Management Tool',
    description: 'Multi-currency (KES/USD) cash flow forecasting for African startups.',
    keyFeatures: ['KES/USD Support', 'Cash Flow Forecasting', 'Investor Reports'],
    imageUrl: placeholderImages.finance.imageUrl,
    imageHint: placeholderImages.finance.imageHint,
    gridSpan: 'col-span-1 md:col-span-1',
    icon: 'LineChart',
  },
  {
    id: 4,
    title: 'LMS',
    description: 'Offline-first video modules for remote learning in low-bandwidth areas.',
    keyFeatures: ['Offline-First', 'Video Modules', 'Progress Syncing'],
    imageUrl: placeholderImages.lms.imageUrl,
    imageHint: placeholderImages.lms.imageHint,
    gridSpan: 'col-span-1 md:col-span-1',
    icon: 'BookOpen',
  },
  {
    id: 5,
    title: 'Enterprise Web Platform',
    description: 'Scalable web platform with a fully integrated CRM system.',
    keyFeatures: ['Integrated CRM', 'Microservices', 'High Availability'],
    imageUrl: placeholderImages.enterpriseA.imageUrl,
    imageHint: placeholderImages.enterpriseA.imageHint,
    gridSpan: 'col-span-1 md:col-span-1',
    icon: 'Server',
  },
  {
    id: 6,
    title: 'Enterprise Web Platform',
    description: 'Secure, compliant enterprise solution with advanced CRM capabilities.',
    keyFeatures: ['Advanced CRM', 'Data Encryption', 'API Gateway'],
    imageUrl: placeholderImages.enterpriseB.imageUrl,
    imageHint: placeholderImages.enterpriseB.imageHint,
    gridSpan: 'col-span-1 md:col-span-1',
    icon: 'Globe',
  },
];

export const ventureMetrics: VentureMetrics[] = [
    {
        startupName: "TechSavannah",
        timeline: [
            { day: 1, title: 'Concept Finalized', description: 'Initial idea refined into a solid business concept.' },
            { day: 15, title: 'MVP Development Begins', description: 'Core development started on the Minimum Viable Product.' },
            { day: 45, title: 'First Client Onboarded', description: 'Secured the first pilot program client, validating the solution.' },
            { day: 60, title: 'Second Client Acquired', description: 'Expanded the pilot program with a second client.' },
            { day: 90, title: 'Generating Revenue', description: 'Successfully converted pilot clients into paying customers.' },
        ]
    },
    {
        startupName: "ConnectSphere",
        timeline: [
            { day: 1, title: 'Concept Finalized', description: 'Initial idea refined into a solid business concept.' },
            { day: 20, title: 'Prototype Developed', description: 'A functional prototype was created and tested internally.' },
            { day: 50, title: 'First User Group Onboarded', description: 'Onboarded an initial group of users for beta testing.' },
            { day: 75, title: 'First Paying Customer', description: 'Converted a beta user into the first paying customer.' },
            { day: 90, title: 'Reached 100 Active Users', description: 'Achieved a key user milestone, indicating market traction.' },
        ]
    }
]
