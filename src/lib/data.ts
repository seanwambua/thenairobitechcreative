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

export interface Testimonial {
  id: number;
  quote: string;
  author: string;
  title: string;
  avatarUrl: string;
  avatarHint: string;
}

export interface Post {
  id: number;
  title: string;
  description: string;
  imageUrl: string;
  imageHint: string;
  author: string;
  authorAvatarUrl: string;
  authorAvatarHint: string;
  date: string;
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

export const testimonials: Testimonial[] = [
  {
    id: 1,
    quote: "Working with Nairobi Tech Creative was a game-changer. Their insights into the African market and their technical execution are second to none.",
    author: "Jane Doe",
    title: "CEO, AgriConnect",
    avatarUrl: placeholderImages.testimonial1.imageUrl,
    avatarHint: placeholderImages.testimonial1.imageHint,
  },
  {
    id: 2,
    quote: "The team's dedication to building scalable, offline-first solutions helped us reach communities we never thought possible. Truly innovative.",
    author: "John Smith",
    title: "Founder, EduScale",
    avatarUrl: placeholderImages.testimonial2.imageUrl,
    avatarHint: placeholderImages.testimonial2.imageHint,
  },
  {
    id: 3,
    quote: "Their financial forecasting tool, with its multi-currency support, was essential for our seed round. They understand the startup journey in Africa.",
    author: "Amina Okoro",
    title: "CFO, FinTech Innovators",
    avatarUrl: placeholderImages.testimonial3.imageUrl,
    avatarHint: placeholderImages.testimonial3.imageHint,
  },
  {
    id: 4,
    quote: "The collaborative design platform they built for us has become the central hub for our creative community. The user experience is flawless.",
    author: "Kwame Annan",
    title: "Director, Creative Guild Africa",
    avatarUrl: placeholderImages.testimonial4.imageUrl,
    avatarHint: placeholderImages.testimonial4.imageHint,
  },
];

export const posts: Post[] = [
  {
    id: 1,
    title: 'The Rise of Mobile-First Solutions in Africa',
    description: 'Exploring how mobile technology is shaping the future of business and daily life across the continent.',
    imageUrl: placeholderImages.blog1.imageUrl,
    imageHint: placeholderImages.blog1.imageHint,
    author: 'Jalen Doe',
    authorAvatarUrl: placeholderImages.testimonial1.imageUrl,
    authorAvatarHint: placeholderImages.testimonial1.imageHint,
    date: 'Oct 10, 2024',
  },
  {
    id: 2,
    title: 'FinTech Innovation: Beyond Mobile Money',
    description: 'A deep dive into the next wave of financial technology emerging from African tech hubs.',
    imageUrl: placeholderImages.blog2.imageUrl,
    imageHint: placeholderImages.blog2.imageHint,
    author: 'Maria Garcia',
    authorAvatarUrl: placeholderImages.testimonial3.imageUrl,
    authorAvatarHint: placeholderImages.testimonial3.imageHint,
    date: 'Oct 2, 2024',
  },
  {
    id: 3,
    title: 'Designing for Accessibility in a Diverse Market',
    description: 'Key principles and practical tips for creating inclusive digital products for all users.',
    imageUrl: placeholderImages.blog3.imageUrl,
    imageHint: placeholderImages.blog3.imageHint,
    author: 'David Kim',
    authorAvatarUrl: placeholderImages.testimonial2.imageUrl,
    authorAvatarHint: placeholderImages.testimonial2.imageHint,
    date: 'Sep 25, 2024',
  },
];
