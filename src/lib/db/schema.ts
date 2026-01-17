import { sqliteTable, integer, text } from 'drizzle-orm/sqlite-core';
import { sql } from 'drizzle-orm';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  keyFeatures: text('keyFeatures').notNull(),
  imageUrl: text('imageUrl').notNull(),
  imageHint: text('imageHint').notNull(),
  gridSpan: text('gridSpan').notNull(),
  icon: text('icon').notNull(),
  createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
  updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const posts = sqliteTable('posts', {
    id: integer('id').primaryKey(),
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
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});

export const testimonials = sqliteTable('testimonials', {
    id: integer('id').primaryKey(),
    quote: text('quote').notNull(),
    author: text('author').notNull(),
    title: text('title').notNull(),
    avatarUrl: text('avatarUrl').notNull(),
    avatarHint: text('avatarHint').notNull(),
    createdAt: text('created_at').notNull().default(sql`CURRENT_TIMESTAMP`),
    updatedAt: text('updated_at').notNull().default(sql`CURRENT_TIMESTAMP`),
});
