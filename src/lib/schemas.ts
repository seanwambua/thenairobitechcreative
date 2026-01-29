import { z } from 'zod';

export const iconNames = [
  'Boxes',
  'BookOpen',
  'PenTool',
  'LineChart',
  'Globe',
  'Server',
  'ScanSearch',
  'LayoutTemplate',
  'Rocket',
  'Scaling',
  'Briefcase',
  'Computer',
  'Wrench',
  'ServerCog',
  'Star',
  'ShieldCheck',
] as const;
export type IconName = (typeof iconNames)[number];

// Schema for project input. `keyFeatures` is an array for the form, but a string in the DB.
export const ProjectSchema = z.object({
  id: z.number(),
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
  keyFeatures: z
    .array(z.string())
    .min(1, 'Please add at least one key feature.'),
  imageUrl: z.string().url(),
  imageHint: z.string(),
  gridSpan: z.string(),
  icon: z.enum(iconNames),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().optional(),
});

// Used for create/update actions where some fields are not required.
const ProjectInputSchema = ProjectSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type ProjectInputSchemaType = z.infer<typeof ProjectInputSchema>;

export const TestimonialSchema = z.object({
  id: z.number(),
  quote: z.string().min(10, 'Quote must be at least 10 characters.'),
  author: z.string().min(2, 'Author name must be at least 2 characters.'),
  title: z.string().min(3, 'Author title must be at least 3 characters.'),
  avatarUrl: z.string().url(),
  avatarHint: z.string(),
  createdAt: z.date(),
  updatedAt: z.date(),
  userId: z.string().optional(),
});

const TestimonialInputSchema = TestimonialSchema.omit({
  id: true,
  createdAt: true,
  updatedAt: true,
});
export type TestimonialInputSchemaType = z.infer<typeof TestimonialInputSchema>;

// Schema for validating post form input
export const PostInputSchema = z.object({
  title: z.string().min(3, 'Title must be at least 3 characters.'),
  description: z
    .string()
    .min(10, 'Description must be at least 10 characters.'),
  content: z.string().min(20, 'Content must be at least 20 characters.'),
  author: z.string().min(2, 'Author name must be at least 2 characters.'),
  imageUrl: z.string().url().optional(),
  authorAvatarUrl: z.string().url().optional(),
});

// Schema for validating the full Post object, often after retrieval from the DB.
export const PostSchema = PostInputSchema.extend({
  id: z.number(),
  slug: z.string(),
  imageUrl: z.string().url(),
  imageHint: z.string(),
  authorAvatarUrl: z.string().url(),
  authorAvatarHint: z.string(),
  likes: z.number(),
  comments: z.string(),
  createdAt: z.coerce.date(),
  updatedAt: z.coerce.date(),
  userId: z.string().optional(),
});

export type PostSchemaType = z.infer<typeof PostSchema>;
