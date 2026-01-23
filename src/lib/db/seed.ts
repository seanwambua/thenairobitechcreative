import prisma from '@/lib/prisma';
import { placeholderImages } from '@/lib/placeholder-images';

export async function seedDatabase() {
  console.log('Starting database seed...');

  await prisma.post.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.settings.deleteMany({});
  await prisma.user.deleteMany({});

  await prisma.user.create({
    data: {
      email: 'example@example.com',
      name: 'Test User',
    },
  });

  await prisma.post.create({
    data: {
      slug: 'my-first-post',
      title: 'My First Post',
      description: 'This is the description of my first post.',
      content: 'This is the content of my first post.',
      imageUrl: placeholderImages.blog1Image.imageUrl,
      imageHint: placeholderImages.blog1Image.imageHint,
      author: 'Test User',
      authorAvatarUrl: placeholderImages.testimonial1Image.imageUrl,
      authorAvatarHint: placeholderImages.testimonial1Image.imageHint,
      likes: 10,
      comments: '[]',
    },
  });

  await prisma.project.create({
    data: {
      title: 'My First Project',
      description: 'This is the description of my first project.',
      keyFeatures: 'Feature 1,Feature 2,Feature 3',
      imageUrl: placeholderImages.enterpriseB.imageUrl,
      imageHint: 'A screenshot of the project',
      gridSpan: 'col-span-1',
      icon: 'Code',
    },
  });

  await prisma.testimonial.create({
    data: {
      quote: 'This is a great product!',
      author: 'Happy Customer',
      title: 'CEO of a company',
      avatarUrl: placeholderImages.testimonial1Image.imageUrl,
      avatarHint: 'A happy customer',
    },
  });

  await prisma.settings.createMany({
    data: [
      { key: 'heroImage', value: null },
      { key: 'logo', value: null },
      { key: 'founderImage', value: null },
      { key: 'founderName', value: 'Jalen Doe' },
    ],
  });

  console.log('Database seeded successfully.');
}
