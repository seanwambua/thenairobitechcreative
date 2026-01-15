import { PrismaClient } from '@prisma/client';
import { initialProjects, initialPosts, initialTestimonials } from '../src/lib/data';

const prisma = new PrismaClient();

async function main() {
  console.log('Start seeding...');

  // Seed Projects
  for (const project of initialProjects) {
    const { id, keyFeatures, ...rest } = project;
    await prisma.project.upsert({
      where: { id },
      update: {
        ...rest,
        keyFeatures: keyFeatures.join(','),
      },
      create: {
        id,
        ...rest,
        keyFeatures: keyFeatures.join(','),
      },
    });
  }
  console.log('Projects seeded.');

  // Seed Posts
  for (const post of initialPosts) {
    const { id, comments, ...rest } = post; // exclude comments
    await prisma.post.upsert({
      where: { id },
      update: {
        ...rest,
        likes: rest.likes || 0,
      },
      create: {
        id,
        ...rest,
        likes: rest.likes || 0,
      },
    });
  }
  console.log('Posts seeded.');

  // Seed Testimonials
  for (const testimonial of initialTestimonials) {
    const { id, ...rest } = testimonial;
    await prisma.testimonial.upsert({
      where: { id },
      update: rest,
      create: {
        id,
        ...rest
      },
    });
  }
  console.log('Testimonials seeded.');

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await prisma.$disconnect();
  });
