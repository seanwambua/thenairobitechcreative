import { z } from 'zod';
import type { Project as PrismaProject, Post as PrismaPost, Testimonial as PrismaTestimonial } from '@prisma/client';

export const iconNames = ['Boxes', 'BookOpen', 'PenTool', 'LineChart', 'Globe', 'Server', 'ScanSearch', 'LayoutTemplate', 'Rocket', 'Scaling', 'Briefcase', 'Computer', 'Wrench', 'ServerCog', 'Star'] as const;
export type IconName = (typeof iconNames)[number];


// Schema for project input. `keyFeatures` is an array for the form, but a string in the DB.
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

// Used for create/update actions where some fields are not required.
const ProjectInputSchema = ProjectSchema.omit({ id: true, createdAt: true, updatedAt: true });
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
});

const TestimonialInputSchema = TestimonialSchema.omit({id: true, createdAt: true, updatedAt: true});
export type TestimonialInputSchemaType = z.infer<typeof TestimonialInputSchema>;


// Prisma's Post type already matches what we need for validation of the full object.
export const PostSchema = z.custom<PrismaPost>();

export type PostSchemaType = z.infer<typeof PostSchema>;
