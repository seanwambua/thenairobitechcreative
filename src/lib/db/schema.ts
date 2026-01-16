import { pgTable, serial, text, integer, timestamp } from 'drizzle-orm/pg-core';

export const projects = pgTable('projects', {
  id: serial('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  keyFeatures: text('keyFeatures').notNull(),
  imageUrl: text('imageUrl').notNull(),
  imageHint: text('imageHint').notNull(),
  gridSpan: text('gridSpan').notNull(),
  icon: text('icon').notNull(),
  createdAt: timestamp('created_at').notNull().defaultNow(),
  updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const posts = pgTable('posts', {
    id: serial('id').primaryKey(),
    slug: text('slug').notNull(),
    title: text('title').notNull(),
    description: text('description').notNull(),
    content: text('content').notNull(),
    imageUrl: text('imageUrl').notNull(),
    imageHint: text('imageHint').notNull(),
    author: text('author').notNull(),
    authorAvatarUrl: text('authorAvatarUrl').notNull(),
    authorAvatarHint: text('authorAvatarHint').notNull(),
    likes: integer('likes').notNull().default(0),
    comments: text('comments').notNull().default(''),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});

export const testimonials = pgTable('testimonials', {
    id: serial('id').primaryKey(),
    quote: text('quote').notNull(),
    author: text('author').notNull(),
    title: text('title').notNull(),
    avatarUrl: text('avatarUrl').notNull(),
    avatarHint: text('avatarHint').notNull(),
    createdAt: timestamp('created_at').notNull().defaultNow(),
    updatedAt: timestamp('updated_at').notNull().defaultNow(),
});
