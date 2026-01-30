import prisma from '@/lib/prisma';
import placeholderImages from '@/app/lib/placeholder-images.json';
import { Role } from '@/lib/roles';
import bcrypt from 'bcrypt';

export async function seedDatabase() {
  console.log('Starting database seed...');

  await prisma.comment.deleteMany({});
  await prisma.like.deleteMany({});
  await prisma.post.deleteMany({});
  await prisma.project.deleteMany({});
  await prisma.testimonial.deleteMany({});
  await prisma.settings.deleteMany({});
  await prisma.user.deleteMany({});
  await prisma.account.deleteMany({});
  await prisma.session.deleteMany({});
  await prisma.verificationToken.deleteMany({});

  const hashedPassword = await bcrypt.hash('12345678', 16);

  const adminUser = await prisma.user.create({
    data: {
      email: 'seanwambua@gmail.com',
      name: 'Sean Wambua',
      role: Role.ADMIN,
      hashedPassword: hashedPassword,
      image: placeholderImages.testimonial1Image.imageUrl,
    },
  });

  await prisma.account.create({
    data: {
      userId: adminUser.id,
      type: 'credentials',
      provider: 'credentials',
      providerAccountId: adminUser.id,
    },
  });

  const post = await prisma.post.create({
    data: {
      slug: 'my-first-post',
      title: 'My First Post',
      description: 'This is the description of my first post.',
      content: 'This is the content of my first post.',
      imageUrl: placeholderImages.blog1Image.imageUrl,
      imageHint: placeholderImages.blog1Image.imageHint,
      author: 'Sean Wambua',
      authorAvatarUrl: placeholderImages.testimonial1Image.imageUrl,
      authorAvatarHint: placeholderImages.testimonial1Image.imageHint,
      userId: adminUser.id,
    },
  });

  await prisma.like.create({
    data: {
      postId: post.id,
      userId: adminUser.id,
    }
  });

  await prisma.comment.create({
    data: {
      postId: post.id,
      userId: adminUser.id,
      content: "This is a great first comment!"
    }
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
        userId: adminUser.id,
      },
      {
        title: 'StellarGuard',
        description: 'Decentralized security for modern apps using blockchain.',
        keyFeatures: 'Decentralized Security,Blockchain,Threat Intelligence',
        imageUrl: placeholderImages.project2.imageUrl,
        imageHint: 'blockchain security',
        gridSpan: 'col-span-1',
        icon: 'ShieldCheck',
        userId: adminUser.id,
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
        userId: adminUser.id,
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
        userId: adminUser.id,
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
        userId: adminUser.id,
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
      userId: adminUser.id,
    },
  });

  await prisma.settings.createMany({
    data: [
      { key: 'heroImage', value: 'https://res.cloudinary.com/dm1bn7vkd/image/upload/v1769188669/nairobi_techcreative/1769188621878_kgkj5u.png' },
      { key: 'logo', value: 'https://res.cloudinary.com/dm1bn7vkd/image/upload/v1769187527/nairobi_techcreative/ntc-logo_cv0t3n.png' },
      { key: 'founderImage', value: 'https://res.cloudinary.com/dm1bn7vkd/image/upload/v1769189197/nairobi_techcreative/IMG_20260123_202554_at0rca.jpg' },
      { key: 'founderName', value: 'Sean Wambua' },
      {
        key: 'founderMessage',
        value:
          'At The Nairobi Tech Creative, we believe in the power of African innovation to solve global problems. We are not just building software; we are crafting digital solutions that empower communities, drive growth, and create lasting impact.',
      },
    ],
  });

  console.log('Database seeded successfully.');
}
