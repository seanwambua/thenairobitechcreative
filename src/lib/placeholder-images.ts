export type ImagePlaceholder = {
  id: string;
  imageUrl: string;
  imageHint: string;
  description?: string;
};

export const placeholderImages: Record<string, ImagePlaceholder> = {
  blog1Image: {
    id: 'blog1',
    imageUrl: 'https://placehold.co/1200x630',
    imageHint: 'Placeholder blog post image',
  },
  testimonial1Image: {
    id: 'testimonial1',
    imageUrl: 'https://placehold.co/40x40',
    imageHint: 'Placeholder testimonial author avatar',
  },
  founderImage: {
    id: 'founder',
    imageUrl: 'https://placehold.co/400x400',
    imageHint: 'Placeholder founder image',
  },
  hero: {
    id: 'hero',
    imageUrl: 'https://placehold.co/1920x1080',
    imageHint: 'Placeholder hero image',
  },
  logo: {
    id: 'logo',
    imageUrl: 'https://placehold.co/100x40',
    imageHint: 'Placeholder logo',
  },
  design: {
    id: 'design',
    imageUrl: 'https://placehold.co/1920x1080',
    imageHint: 'Placeholder hero image for design',
    description: 'Design Category',
  },
  finance: {
    id: 'finance',
    imageUrl: 'https://placehold.co/1920x1080',
    imageHint: 'Placeholder hero image for finance',
    description: 'Finance Category',
  },
  enterpriseB: {
    id: 'enterpriseB',
    imageUrl: 'https://placehold.co/1920x1080',
    imageHint: 'Placeholder hero image for enterprise B',
    description: 'Enterprise B Category',
  },
};
