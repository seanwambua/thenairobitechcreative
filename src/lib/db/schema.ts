import { sqliteTable, text, integer } from 'drizzle-orm/sqlite-core';

export const projects = sqliteTable('projects', {
  id: integer('id').primaryKey(),
  title: text('title').notNull(),
  description: text('description').notNull(),
  keyFeatures: text('keyFeatures').notNull(),
  imageUrl: text('imageUrl').notNull(),
  imageHint: text('imageHint').notNull(),
  gridSpan: text('gridSpan').notNull(),
  icon: text('icon').notNull(),
  createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
  updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
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
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});

export const testimonials = sqliteTable('testimonials', {
    id: integer('id').primaryKey(),
    quote: text('quote').notNull(),
    author: text('author').notNull(),
    title: text('title').notNull(),
    avatarUrl: text('avatarUrl').notNull(),
    avatarHint: text('avatarHint').notNull(),
    createdAt: integer('created_at', { mode: 'timestamp' }).notNull(),
    updatedAt: integer('updated_at', { mode: 'timestamp' }).notNull(),
});
