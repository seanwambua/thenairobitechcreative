import prisma from '@/lib/prisma';
import { placeholderImages } from '@/lib/placeholder-images';

export async function seedDatabase() {
  console.log('Starting database seed...');

  await prisma.post.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.settings.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.verificationToken.deleteMany({});

  await prisma.user.create({
    data: {
      email: 'admin@example.com',
      name: 'Admin User',
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
      author: 'Admin User',
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
      icon: 'Boxes',
    },
  });

  await prisma.testimonial.create({
    data: {
      quote: 'This is a great product!',
      author: 'Valued Partner',
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
      { key: 'founderName', value: 'Admin User' },
      {
        key: 'founderMessage',
        value:
          'At The Nairobi Tech Creative, we believe in the power of African innovation to solve global problems. We are not just building software; we are crafting digital solutions that empower communities, drive growth, and create lasting impact.',
      },
    ],
  });

  console.log('Database seeded successfully.');
}
