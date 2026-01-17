import type { IconName } from './schemas';
import type { Project as PrismaProject, Post, Testimonial as PrismaTestimonial } from '@prisma/client';

export type { Post };

export type Testimonial = PrismaTestimonial;

export interface NavItem {
    href: string;
    label: string;
    hidden?: boolean;
}

export type Project = Omit<PrismaProject, 'keyFeatures' | 'icon'> & {
  keyFeatures: string[];
  icon: IconName;
};

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
    {
      id: 4,
      title: 'Initial Consult',
      icon: 'Briefcase',
      description: "One-on-one guidance to refine your idea, define your strategy, and create a clear roadmap for your project."
    }
  ];

export const pricingPlans: PricingPlan[] = [
    {
      id: 1,
      title: 'Initial Consult',
      description: "One-on-one guidance to refine your idea, define your strategy, and create a clear roadmap for your project.",
      price: '3,500',
      priceSuffix: '',
      features: [
        "2-Hour Intensive Strategy Session",
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
