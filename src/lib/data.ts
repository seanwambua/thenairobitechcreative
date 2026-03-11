import { Prisma } from '@prisma/client';

export type PostSummary = Prisma.PostGetPayload<{
  select: {
    id: true;
    slug: true;
    title: true;
    description: true;
    imageUrl: true;
    imageHint: true;
    author: true;
    authorAvatarUrl: true;
    authorAvatarHint: true;
    createdAt: true;
    updatedAt: true;
    _count: {
      select: { likes: true; comments: true };
    };
  };
}>;

export const navLinks = [
  { href: '/', label: 'Home' },
  { href: '/about', label: 'About' },
  { href: '/services', label: 'Services' },
  { href: '/pricing', label: 'Pricing' },
  { href: '/blog', label: 'Blog' },
  { href: '/contact', label: 'Contact' },
];

export const services = [
  {
    title: 'Web Development',
    description: 'Building modern, responsive websites.',
  },
  {
    title: 'Mobile App Development',
    description: 'Creating native and cross-platform mobile apps.',
  },
  {
    title: 'UI/UX Design',
    description: 'Designing intuitive and beautiful user interfaces.',
  },
  {
    title: 'Digital Marketing',
    description: 'Helping you reach your target audience.',
  },
];

export const processSteps = [
  {
    title: 'Discovery & Strategy',
    description:
      'We start by understanding your goals and planning the project.',
  },
  {
    title: 'Design & Prototyping',
    description: 'We create wireframes and prototypes for your approval.',
  },
  {
    title: 'Development & Testing',
    description: 'We build and rigorously test your application.',
  },
  {
    title: 'Deployment & Support',
    description: 'We launch your project and provide ongoing support.',
  },
];

export const pricingPlans = [
  {
    name: 'Basic',
    price: '$49',
    features: ['1 Project', 'Basic Support', '10GB Storage'],
    isFeatured: false,
  },
  {
    name: 'Pro',
    price: '$99',
    features: [
      '5 Projects',
      'Priority Support',
      '50GB Storage',
      'Advanced Analytics',
    ],
    isFeatured: true,
  },
  {
    name: 'Enterprise',
    price: 'Custom',
    features: [
      'Unlimited Projects',
      '24/7 Support',
      'Unlimited Storage',
      'Custom Integrations',
    ],
    isFeatured: false,
  },
];

export const faqs = [
  {
    question: 'What is your development process?',
    answer:
      'We follow a four-step process: Discovery & Strategy, Design & Prototyping, Development & Testing, and Deployment & Support.',
  },
  {
    question: 'How long does a project typically take?',
    answer:
      "The timeline varies depending on the project's complexity, but we always provide a detailed schedule upfront.",
  },
  {
    question: 'Do you offer support after the project is launched?',
    answer:
      'Yes, we offer various support and maintenance packages to ensure your project runs smoothly post-launch.',
  },
];
