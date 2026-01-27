export type ImagePlaceholder = {
  id: string;
  imageUrl: string;
  imageHint: string;
  description?: string;
};

export const placeholderImages: Record<string, ImagePlaceholder> = {
  blog1Image: {
    id: 'blog1',
    imageUrl: 'https://picsum.photos/seed/blog1/1200/630',
    imageHint: 'Placeholder blog post image',
  },
  testimonial1Image: {
    id: 'testimonial1',
    imageUrl: 'https://picsum.photos/seed/avatar1/40/40',
    imageHint: 'Placeholder testimonial author avatar',
  },
  founderImage: {
    id: 'founder',
    imageUrl: 'https://picsum.photos/seed/founder/400/400',
    imageHint: 'Placeholder founder image',
  },
  hero: {
    id: 'hero',
    imageUrl: 'https://picsum.photos/seed/hero/1920/1080',
    imageHint: 'Placeholder hero image',
  },
  logo: {
    id: 'logo',
    imageUrl: 'https://placehold.co/100x40',
    imageHint: 'Placeholder logo',
  },
  project1: {
    id: 'project1',
    imageUrl: 'https://picsum.photos/seed/project1/800/600',
    imageHint: 'data analytics dashboard',
  },
  project2: {
    id: 'project2',
    imageUrl: 'https://picsum.photos/seed/project2/800/600',
    imageHint: 'blockchain security',
  },
  project3: {
    id: 'project3',
    imageUrl: 'https://picsum.photos/seed/project3/800/600',
    imageHint: 'e-learning platform',
  },
  project4: {
    id: 'project4',
    imageUrl: 'https://picsum.photos/seed/project4/800/600',
    imageHint: 'eco friendly app',
  },
  project5: {
    id: 'project5',
    imageUrl: 'https://picsum.photos/seed/project5/800/600',
    imageHint: 'finance app',
  },
};
