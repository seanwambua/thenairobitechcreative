import { z } from 'zod';

export const iconNames = ['Boxes', 'BookOpen', 'PenTool', 'LineChart', 'Globe', 'Server', 'ScanSearch', 'LayoutTemplate', 'Rocket', 'Scaling', 'Briefcase', 'Computer', 'Wrench', 'ServerCog', 'Star'] as const;
export type IconName = (typeof iconNames)[number];

export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  keyFeatures: z.array(z.string()).min(1, 'Please add at least one key feature.'),
  imageUrl: z.string().url(),
  imageHint: z.string(),
  gridSpan: z.string(),
  icon: z.enum(iconNames),
  createdAt: z.date(),
  updatedAt: z.date(),
});

export type ProjectSchemaType = z.infer<typeof ProjectSchema>;


export const TestimonialSchema = z.object({
    id: z.number(),
    quote: z.string().min(10, 'Quote must be at least 10 characters.'),
    author: z.string().min(2, 'Author name must be at least 2 characters.'),
    title: z.string().min(3, 'Author title must be at least 3 characters.'),
    avatarUrl: z.string().url(),
    avatarHint: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type TestimonialSchemaType = z.infer<typeof TestimonialSchema>;

export const PostSchema = z.object({
    id: z.number(),
    slug: z.string(),
    title: z.string().min(5, 'Title must be at least 5 characters.'),
    description: z.string().min(10, 'Description must be at least 10 characters.'),
    content: z.string().min(50, 'Content must be at least 50 characters.'),
    imageUrl: z.string().url(),
    imageHint: z.string(),
    author: z.string().min(2, 'Author name must be at least 2 characters.'),
    authorAvatarUrl: z.string().url(),
    authorAvatarHint: z.string(),
    date: z.string(),
    likes: z.number(),
    comments: z.string(),
    createdAt: z.date(),
    updatedAt: z.date(),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
