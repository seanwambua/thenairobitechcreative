import { db } from '.';
import * as schema from './schema';
import { initialProjects, initialPosts, initialTestimonials } from '../data';

export async function seedDatabase() {
  console.log('Start seeding...');
  
  try {
    // Clear existing data to prevent duplicates
    console.log('Clearing existing data...');
    await db.delete(schema.posts);
    await db.delete(schema.projects);
    await db.delete(schema.testimonials);
    console.log('Data cleared.');

    // Seed Projects
    for (const project of initialProjects) {
        const { id, createdAt, updatedAt, keyFeatures, ...rest } = project;
        await db.insert(schema.projects).values({
            ...rest,
            keyFeatures: keyFeatures.join(','),
        });
    }
    console.log(`Seeded ${initialProjects.length} projects.`);

    // Seed Posts
    for (const post of initialPosts) {
        const { id, createdAt, updatedAt, ...rest } = post;
        await db.insert(schema.posts).values({
            ...rest,
        });
    }
    console.log(`Seeded ${initialPosts.length} posts.`);

    // Seed Testimonials
    for (const testimonial of initialTestimonials) {
        const { id, createdAt, updatedAt, ...rest } = testimonial;
        await db.insert(schema.testimonials).values(rest);
    }
    console.log(`Seeded ${initialTestimonials.length} testimonials.`);

  } catch (error) {
      console.error('Error during seeding:', error);
      throw new Error('Database seeding failed.');
  }
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