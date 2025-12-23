import type { ComponentType } from 'react';
import { Boxes, BookOpen, PenTool, LineChart, Globe, Server, type LucideProps } from 'lucide-react';

export interface Project {
  id: number;
  title: string;
  description: string;
  keyFeatures: string[];
  imageUrl: string;
  imageHint: string;
  gridSpan: 'col-span-1' | 'col-span-1 lg:col-span-2' | 'row-span-1' | 'row-span-1 lg:row-span-2';
  icon: ComponentType<LucideProps>;
}

export interface TimelineEvent {
  day: number;
  title: string;
  description:string;
}

export const projects: Project[] = [
  {
    id: 1,
    title: 'Inventory Management',
    description: 'Robust inventory tracking for SMEs.',
    keyFeatures: ['Real-time tracking', 'Automated reordering', 'Supplier management'],
    imageUrl: 'https://picsum.photos/seed/invm/600/400',
    imageHint: 'warehouse shelves',
    gridSpan: 'col-span-1',
    icon: Boxes,
  },
  {
    id: 2,
    title: 'Graphic Design Workbench',
    description: 'A collaborative platform for designers.',
    keyFeatures: ['Vector editing', 'Cloud assets', 'Team collaboration'],
    imageUrl: 'https://picsum.photos/seed/gdwb/600/800',
    imageHint: 'designer workspace',
    gridSpan: 'col-span-1 lg:col-span-2',
    icon: PenTool,
  },
  {
    id: 3,
    title: 'Financial Management Tool',
    description: 'Intuitive financial planning and tracking.',
    keyFeatures: ['Budgeting', 'Expense tracking', 'Portfolio analysis'],
    imageUrl: 'https://picsum.photos/seed/finm/600/400',
    imageHint: 'financial charts',
    gridSpan: 'col-span-1',
    icon: LineChart,
  },
  {
    id: 4,
    title: 'Learning Management System',
    description: 'Flexible LMS for education and corporate training.',
    keyFeatures: ['Course creation', 'Assessments', 'Progress tracking'],
    imageUrl: 'https://picsum.photos/seed/lms/600/400',
    imageHint: 'online learning',
    gridSpan: 'col-span-1',
    icon: BookOpen,
  },
  {
    id: 5,
    title: 'Enterprise E-Commerce Platform',
    description: 'Scalable platform for large-scale e-commerce.',
    keyFeatures: ['Microservices', 'High availability', 'Advanced analytics'],
    imageUrl: 'https://picsum.photos/seed/ewpA/600/400',
    imageHint: 'server room',
    gridSpan: 'col-span-1',
    icon: Server,
  },
  {
    id: 6,
    title: 'Enterprise Data Platform',
    description: 'Secure platform for enterprise data processing.',
    keyFeatures: ['E2E encryption', 'Real-time streams', 'API gateway'],
    imageUrl: 'https://picsum.photos/seed/ewpB/600/400',
    imageHint: 'global network',
    gridSpan: 'col-span-1',
    icon: Globe,
  },
];

export const timeline: TimelineEvent[] = [
    { day: 1, title: 'Concept Finalized', description: 'Initial ideas for two startups were refined into solid business concepts.' },
    { day: 15, title: 'MVP Development Begins', description: 'Core development started on the Minimum Viable Products for both ventures.' },
    { day: 30, title: 'Prototypes Ready', description: 'Early-stage prototypes were ready for internal testing and feedback cycles.' },
    { day: 45, title: 'First Clients Onboarded', description: 'Each startup secured its first client for a pilot program, validating the solutions.' },
    { day: 60, title: 'Second Clients Acquired', description: 'Both startups expanded their pilot programs with a second client, confirming market need.' },
    { day: 90, title: 'Generating Revenue', description: 'Both ventures successfully converted their four pilot clients into paying customers, achieving initial revenue goals.' },
];
