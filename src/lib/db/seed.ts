import { db } from '.';
import * as schema from './schema';
import { initialProjects, initialPosts, initialTestimonials } from '../data';

export async function seedDatabase() {
  console.log('Start seeding...');

  console.log('Clearing existing data...');
  await db.delete(schema.projects);
  await db.delete(schema.posts);
  await db.delete(schema.testimonials);
  console.log('Cleared existing data.');

  // Seed Projects
  for (const project of initialProjects) {
      const { keyFeatures, ...rest } = project;
      await db.insert(schema.projects).values({
          ...rest,
          keyFeatures: keyFeatures.join(','),
      });
  }
  console.log(`Seeded ${initialProjects.length} projects.`);

  // Seed Posts
  for (const post of initialPosts) {
      await db.insert(schema.posts).values({
          ...post,
          comments: '',
      });
  }
  console.log(`Seeded ${initialPosts.length} posts.`);

  // Seed Testimonials
  for (const testimonial of initialTestimonials) {
      await db.insert(schema.testimonials).values(testimonial);
  }
  console.log(`Seeded ${initialTestimonials.length} testimonials.`);
}

async function main() {
  try {
      await seedDatabase();
      console.log('Seeding finished successfully.');
  } catch (e) {
      console.error('Error during seeding:', e);
      process.exit(1);
  }
}

// This allows the script to be run directly from the command line
if (require.main === module) {
  main();
}
