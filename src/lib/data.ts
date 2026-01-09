
import type { ComponentType } from 'react';
import { Boxes, BookOpen, PenTool, LineChart, Globe, Server, type LucideProps, ScanSearch, LayoutTemplate, Rocket, Scaling, Briefcase, Computer, Wrench, ServerCog, Star } from 'lucide-react';
import { placeholderImages } from './placeholder-images';
import { z } from 'zod';

export const iconNames = ['Boxes', 'BookOpen', 'PenTool', 'LineChart', 'Globe', 'Server', 'ScanSearch', 'LayoutTemplate', 'Rocket', 'Scaling', 'Briefcase', 'Computer', 'Wrench', 'ServerCog', 'Star'] as const;
export type IconName = (typeof iconNames)[number];


export interface NavItem {
    href: string;
    label: string;
    hidden?: boolean;
}

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

export interface PostComment {
    id: string;
    author: string;
    text: string;
    avatarUrl: string;
}

export interface Post {
  id: number;
  slug: string;
  title: string;
  description: string;
  content: string;
  imageUrl: string;
  imageHint: string;
  author: string;
  authorAvatarUrl: string;
  authorAvatarHint: string;
  date: string;
  likes: number;
  comments: PostComment[];
}

export interface Service {
  id: number;
  title: string;
  icon: IconName;
  description: string;
}

export interface PricingPlan {
    id: number;
    title: string;
    description: string;
    price: string;
    priceSuffix: string;
    features: string[];
}

export interface ProcessStep {
    icon: IconName;
    title: string;
    description: string;
}

export interface FAQ {
  id: number;
  question: string;
  answer: string;
}

export const navItems: NavItem[] = [
    {href: '/#portfolio', label: 'Portfolio'},
    {href: '/services', label: 'Services'},
    {href: '/pricing', label: 'Pricing'},
    {href: '/blog', label: 'Blog'},
    {href: '/#testimonials', label: 'Testimonials'},
    {href: '/#contact', label: 'Contact'},
    {href: '/dashboard', label: 'Comprehensive Dashboard', hidden: true},
  ];

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

export const services: Service[] = [
    {
      id: 1,
      title: 'Strategy & Discovery',
      icon: 'ScanSearch',
      description: 'We help you refine your vision and create a solid technical and business strategy.',
    },
    {
      id: 2,
      title: 'Design & Development',
      icon: 'LayoutTemplate',
      description: 'We design and build beautiful, scalable, and user-centric digital products.',
    },
    {
      id: 3,
      title: 'Launch & Scale',
      icon: 'Rocket',
      description: 'We ensure a smooth launch and provide ongoing support to help you grow.',
    },
  ];

export const pricingPlans: PricingPlan[] = [
    {
      id: 1,
      title: 'Consultation',
      description: "One-on-one guidance to refine your idea, define your strategy, and create a clear roadmap for your project.",
      price: '$2k',
      priceSuffix: '',
      features: [
        "1-Hour Intensive Strategy Session",
        "Actionable Project Roadmap",
      ],
    },
    {
      id: 2,
      title: 'Custom Solution',
      description: "End-to-end design and development of a bespoke digital product, tailored to your specific business needs and built to scale.",
      price: 'Custom',
      priceSuffix: '',
      features: [
        "Full Project Lifecycle (Strategy to Scale)",
        "Dedicated Project Team",
        "Custom UI/UX and System Architecture",
        "Ongoing Support & Maintenance",
      ],
    },
  ];

export const processSteps: ProcessStep[] = [
    {
      icon: 'ScanSearch',
      title: '1. Discover',
      description:
        'We kick off with collaborative workshops to dive deep into your business goals, target audience, and challenges.',
    },
    {
      icon: 'LayoutTemplate',
      title: '2. Define',
      description:
        'We translate insights into a concrete plan, creating user journeys, wireframes, and a technical roadmap.',
    },
    {
      icon: 'Rocket',
      title: '3. Develop',
      description:
        'Our agile team builds your product in iterative sprints with regular demos and feedback sessions.',
    },
    {
      icon: 'Scaling',
      title: '4. Deploy',
      description:
        'We manage a seamless launch and transition to a support phase, ensuring your product thrives and evolves.',
    },
  ];


export const initialProjects: Project[] = [
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
    gridSpan: 'col-span-1 md:col-span-2',
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
    keyFeatures: ['Advanced CRM', 'API Gateway'],
    imageUrl: placeholderImages.enterpriseB.imageUrl,
    imageHint: placeholderImages.enterpriseB.imageHint,
    gridSpan: 'col-span-1 md:col-span-2',
    icon: 'Globe',
  },
];

export const initialTestimonials: Testimonial[] = [
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
    slug: 'the-rise-of-mobile-first-solutions-in-africa',
    title: 'The Rise of Mobile-First Solutions in Africa',
    description: 'Exploring how mobile technology is shaping the future of business and daily life across the continent.',
    content: "Africa is not just a mobile-first continent; it's a mobile-only continent for a vast majority of its population. This paradigm shift has led to an explosion of innovation, with developers and entrepreneurs creating solutions tailored specifically for mobile users. From fintech to healthcare, mobile technology is leapfrogging traditional infrastructure, providing access to essential services for millions.\n\nIn this post, we'll explore the key drivers behind this trend, including the proliferation of affordable smartphones, expanding mobile network coverage, and the youthful, tech-savvy demographics of the continent. We'll also showcase some of the most exciting mobile-first companies that are making a global impact from their African headquarters. The future is mobile, and Africa is leading the charge.",
    imageUrl: placeholderImages.blog1.imageUrl,
    imageHint: placeholderImages.blog1.imageHint,
    author: 'Jalen Doe',
    authorAvatarUrl: placeholderImages.testimonial1.imageUrl,
    authorAvatarHint: placeholderImages.testimonial1.imageHint,
    date: 'Oct 10, 2024',
    likes: 128,
    comments: [
      {
        id: 'comment-1',
        author: 'Amina Okoro',
        text: 'Great insights! The mobile-first approach is definitely the key to unlocking the African market.',
        avatarUrl: placeholderImages.testimonial3.imageUrl,
      },
      {
        id: 'comment-2',
        author: 'John Smith',
        text: 'Well-written article. We\'ve seen the impact of this firsthand with EduScale.',
        avatarUrl: placeholderImages.testimonial2.imageUrl,
      },
    ],
  },
  {
    id: 2,
    slug: 'fintech-innovation-beyond-mobile-money',
    title: 'FinTech Innovation: Beyond Mobile Money',
    description: 'A deep dive into the next wave of financial technology emerging from African tech hubs.',
    content: "While mobile money platforms like M-Pesa revolutionized financial inclusion in Africa, the story doesn't end there. A new wave of fintech innovation is building on this foundation, offering more complex financial products to a rapidly growing consumer base. We're seeing the rise of digital-only banks, micro-investment platforms, and AI-powered credit scoring systems that are democratizing access to wealth creation tools.\n\nThese new services are tackling everything from cross-border payments to personal financial management, all through a mobile-centric lens. The regulatory landscape is evolving to keep pace, creating a dynamic and sometimes challenging environment for innovators. This article examines the startups leading the charge and the potential for these African-born solutions to be adapted for global markets.",
    imageUrl: placeholderImages.blog2.imageUrl,
    imageHint: placeholderImages.blog2.imageHint,
    author: 'Maria Garcia',
    authorAvatarUrl: placeholderImages.testimonial3.imageUrl,
    authorAvatarHint: placeholderImages.testimonial3.imageHint,
    date: 'Oct 2, 2024',
    likes: 95,
    comments: [],
  },
  {
    id: 3,
    slug: 'designing-for-accessibility-in-a-diverse-market',
    title: 'Designing for Accessibility in a Diverse Market',
    description: 'Key principles and practical tips for creating inclusive digital products for all users.',
    content: "Designing for the African continent means designing for an incredible diversity of languages, cultures, and levels of digital literacy. It also means accounting for varying device capabilities and network conditions. True accessibility goes beyond screen readers and alt text; it's about creating products that are intuitive, resilient, and respectful of the user's context.\n\nThis post outlines a framework for inclusive design that we follow at The Nairobi Tech Creative. We'll cover topics like offline-first architecture, performance optimization for low-end devices, localization best practices, and the importance of user research with diverse community groups. By prioritizing accessibility from day one, we can build products that truly serve everyone.",
    imageUrl: placeholderImages.blog3.imageUrl,
    imageHint: placeholderImages.blog3.imageHint,
    author: 'David Kim',
    authorAvatarUrl: placeholderImages.testimonial2.imageUrl,
    authorAvatarHint: placeholderImages.testimonial2.imageHint,
    date: 'Sep 25, 2024',
    likes: 210,
    comments: [
        {
            id: 'comment-3',
            author: 'Kwame Annan',
            text: 'This is a crucial topic that is often overlooked. Thanks for sharing your framework!',
            avatarUrl: placeholderImages.testimonial4.imageUrl,
        }
    ],
  },
];
