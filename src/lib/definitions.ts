import { z } from 'zod';
import { PostSchema, ProjectSchema, TestimonialSchema, iconNames } from './schemas';

export type NavLink = {
  href: string;
  label: string;
  hidden?: boolean;
};

export type SocialLink = {
  href: string;
  icon: string;
};

export type Service = {
  id: number;
  title: string;
  icon: IconName;
  description: string;
};

export type FooterLink = {
  title: string;
  links: {
    href: string;
    label: string;
  }[];
};

export type FAQ = {
  id: number;
  question: string;
  answer: string;
};

export type PricingPlan = {
  id: number;
  title: string;
  description: string;
  price: string;
  priceSuffix: string;
  features: string[];
};

export type ProcessStep = {
  icon: IconName;
  title: string;
  description: string;
};

export type Project = z.infer<typeof ProjectSchema>;
export type Testimonial = z.infer<typeof TestimonialSchema>;
export type Post = z.infer<typeof PostSchema>;
export type IconName = (typeof iconNames)[number];
