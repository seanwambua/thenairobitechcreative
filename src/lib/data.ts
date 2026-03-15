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
  { href: 'https://nairobitechcreative.zohobookings.com/#/nairobitechcreative', label: 'Book a session' },
];

export const services = [
  {
    id: 'strategy',
    title: 'Business Strategy & Tech Consulting',
    description:
      'Aligning technology with your business goals. Ideal for founders and SMEs who need a technical IT partner.',
  },
  {
    id: 'development',
    title: 'Product Development',
    description:
      'Taking your idea from concept to shipped product. We help you define the right MVP, build it iteratively, and validate with real users before scaling.',
  },
  {
    id: 'devops',
    title: 'DevOps & Infrastructure',
    description:
      'Setting up and managing CI/CD pipelines, cloud servers, VPS environments, and monitoring systems. Less downtime, faster deployments, and infrastructure that scales with your business.',
  },
  {
    id: 'process',
    title: 'Business Process Development',
    description:
      'Mapping, streamlining, and automating the workflows that run your business. From helpdesk systems to internal tooling, we turn chaotic processes into repeatable, efficient systems.',
  },
  {
    id: 'support',
    title: 'Technical Support',
    description: 'Reliable remote technical support to ensure your systems are always running smoothly. We offer fast and efficient solutions to keep your business operational.',
  },
  {
    id: 'training',
    title: 'User Training',
    description: 'Empowering your team with the skills to effectively use your software and systems. We provide comprehensive training sessions tailored to your needs.',
  }
];

export const partners = [
  {
    name: 'Imani financial services (IFS-KE).',
    description: 'A leading provider of innovative tech solutions, we partner with Innovate Inc. to deliver cutting-edge products.',
    logo: '',
    url: 'https://imanifinancialservices.vercel.app/'
  },
  {
    name: 'The Global Grid.',
    description: 'Experts in system integration, Synergy Systems helps us provide seamless and unified solutions for our clients.',
    logo: '',
    url: 'https://globalgrid.vercel.app/'
  },
  {
    name: 'Whyte Interior Designs.',
    description: 'Specializing in business growth strategies, Growth Catalysts works with us to help our clients scale effectively.',
    logo: '',
    url: 'https://whyteinteriordesigns.vercel.app/'
  }
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
    id:1,
    name: 'Business Strategy & Tech Consultation',
    priceSuffix:'KES',
    price: '3,500',
    description: ['Remote | In-person'],
    features: ['1 Hr Session'],
    isFeatured: true,
  }  
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
