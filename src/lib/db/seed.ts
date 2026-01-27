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

  await prisma.project.createMany({
    data: [
      {
        title: 'QuantumLeap CRM',
        description:
          'AI-powered CRM for predictive analytics and customer insights.',
        keyFeatures: 'AI Insights,Predictive Analytics,Custom Dashboards',
        imageUrl: placeholderImages.project1.imageUrl,
        imageHint: 'data analytics dashboard',
        gridSpan: 'sm:col-span-2 lg:col-span-2',
        icon: 'Boxes',
      },
      {
        title: 'StellarGuard',
        description: 'Decentralized security for modern apps using blockchain.',
        keyFeatures: 'Decentralized Security,Blockchain,Threat Intelligence',
        imageUrl: placeholderImages.project2.imageUrl,
        imageHint: 'blockchain security',
        gridSpan: 'col-span-1',
        icon: 'ShieldCheck',
      },
      {
        title: 'InnovateU',
        description:
          'An e-learning platform that fosters innovation through collaborative projects and mentorship from industry leaders.',
        keyFeatures: 'E-learning,Collaboration,Mentorship',
        imageUrl: placeholderImages.project3.imageUrl,
        imageHint: 'e-learning platform',
        gridSpan: 'col-span-1',
        icon: 'BookOpen',
      },
      {
        title: 'EcoTrack',
        description:
          'A mobile app that helps users track and reduce their carbon footprint through smart recommendations and community challenges.',
        keyFeatures:
          'Carbon Tracking,Smart Recommendations,Community Challenges',
        imageUrl: placeholderImages.project4.imageUrl,
        imageHint: 'eco friendly app',
        gridSpan: 'col-span-1',
        icon: 'Globe',
      },
      {
        title: 'FinWiz',
        description:
          'A personal finance management app that leverages AI to provide personalized budgeting advice and investment opportunities.',
        keyFeatures: 'AI Budgeting,Investment Tracking,Financial Planning',
        imageUrl: placeholderImages.project5.imageUrl,
        imageHint: 'finance app',
        gridSpan: 'col-span-1 sm:col-span-2 lg:col-span-2',
        icon: 'LineChart',
      },
    ],
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
