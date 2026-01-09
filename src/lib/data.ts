import type { ComponentType } from 'react';
import { Boxes, BookOpen, PenTool, LineChart, Globe, Server, type LucideProps, ScanSearch, LayoutTemplate, Rocket, Scaling } from 'lucide-react';
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

export interface Service {
  id: number;
  title: string;
  icon: string;
  description: string;
  details: string[];
}

export interface PricingPlan {
  id: number;
  title: string;
  description: string;
  price: string;
  priceSuffix: string;
  features: string[];
  recommended: boolean;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const faqs: FAQ[] = [
  {
    id: 1,
    question: "What is the typical timeline for a project?",
    answer: "Project timelines vary depending on the scope and complexity. A typical project discovery and design phase takes 2-4 weeks, followed by development sprints of 2-3 months. We work closely with you to establish a detailed timeline upfront."
  },
  {
    id: 2,
    question: "How do you handle project management and communication?",
    answer: "We use an agile project management approach with regular check-ins and demos. You'll have a dedicated project manager and direct access to the team through collaborative tools like Slack and Asana to ensure clear communication and transparency."
  },
  {
    id: 3,
    question: "Can you work with existing codebases or systems?",
    answer: "Absolutely. We can audit your existing systems, identify areas for improvement, and integrate new features or build on top of your current infrastructure. Our goal is to enhance your technology, not necessarily replace it."
  },
  {
    id: 4,
    question: "What kind of post-launch support do you offer?",
    answer: "We offer various levels of ongoing support and maintenance retainers to ensure your product remains secure, up-to-date, and optimized for performance. We can also provide support for future feature development and scaling."
  },
  {
    id: 5,
    question: "How do you ensure the quality of the final product?",
    answer: "Quality is at the core of our process. We conduct rigorous testing at every stage, including unit testing, integration testing, and user acceptance testing (UAT). We also perform security audits and performance profiling before launch."
  }
];

export const pricingPlans: PricingPlan[] = [
  {
    id: 1,
    title: 'Ignite',
    description: 'Perfect for startups and small projects to get off the ground.',
    price: '$5K',
    priceSuffix: '/project',
    features: [
      'UI/UX Design (Up to 10 screens)',
      'Web/Mobile App Development',
      'Basic CMS Integration',
      '1 Month Post-Launch Support'
    ],
    recommended: false,
  },
  {
    id: 2,
    title: 'Accelerate',
    description: 'Ideal for growing businesses looking to scale their digital presence.',
    price: '$15K',
    priceSuffix: '/project',
    features: [
      'Full UI/UX Design System',
      'Scalable Architecture',
      'Advanced API Integration',
      'CI/CD & DevOps Setup',
      '3 Months Post-Launch Support'
    ],
    recommended: true,
  },
  {
    id: 3,
    title: 'Innovate',
    description: 'Comprehensive solutions for enterprises and complex digital products.',
    price: 'Custom',
    priceSuffix: '',
    features: [
      'Dedicated Product Team',
      'Enterprise-Grade Solution',
      'Advanced Security & Compliance',
      'On-going Optimization & Scaling',
      'Dedicated Support Retainer'
    ],
    recommended: false,
  },
];


export const services: Service[] = [
  {
    id: 1,
    title: 'Discovery & Strategy',
    icon: 'ScanSearch',
    description: "We start by understanding your vision, market, and challenges to define a clear roadmap for success.",
    details: [
      "Stakeholder Workshops",
      "Market & Competitor Analysis",
      "Technical Feasibility Study",
      "Product Roadmap Definition",
    ],
  },
  {
    id: 2,
    title: 'Design & Prototyping',
    icon: 'LayoutTemplate',
    description: "Our team crafts intuitive, user-centric designs that are both beautiful and functional, bringing your ideas to life.",
    details: [
      "User Experience (UX) & User Interface (UI) Design",
      "Interactive Prototyping",
      "Brand Identity & Style Guides",
      "Usability Testing",
    ],
  },
  {
    id: 3,
    title: 'Development & Launch',
    icon: 'Rocket',
    description: "We build robust, scalable solutions using modern technologies and deploy them seamlessly for a successful launch.",
    details: [
      "Agile Development Sprints",
      "Front-end & Back-end Engineering",
      "Cloud Infrastructure Setup (AWS/GCP)",
      "CI/CD & Automated Deployment",
    ],
  },
  {
    id: 4,
    title: 'Scale & Optimize',
    icon: 'Scaling',
    description: "After launch, we monitor performance, gather user feedback, and iterate to ensure long-term growth and success.",
    details: [
      "Performance Monitoring & Analytics",
      "User Feedback & Iteration Cycles",
      "Scalability & Architecture Reviews",
      "Ongoing Support & Maintenance",
    ],
  },
];


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
