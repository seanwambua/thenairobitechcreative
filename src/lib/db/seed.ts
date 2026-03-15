import prisma from '@/lib/prisma';
import placeholderImages from '@/lib/placeholder-images.json';
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

  const hashedPassword = await bcrypt.hash(process.env.ADMIN_PASSWORD!, 12);

  const adminUser = await prisma.user.create({
    data: {
      email: 'seanwambua@gmail.com',
      name: 'Sean Wambua',
      role: Role.ADMIN,
      status: 'APPROVED',
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
        title: 'Interior Design Studio',
        description: 'A modern collaborative space for interior design founders and SMEs to streamline business operations.',
        keyFeatures: 'PaaS, collaboration, portals, project audit, legal frameworks, customer service, mvp',
        imageUrl: placeholderImages.project1.imageUrl,
        imageHint: 'ntc-logo',
        gridSpan: 'col-span-12 lg:col-span-8',
        icon: 'Boxes',
        isFavorite: true,
        userId: adminUser.id,
      },
      {
        title: 'SecureCSV',
        description: 'A financial management reconciliation tool.',
        keyFeatures: 'financial reconciliation, imani financial sevices',
        imageUrl: placeholderImages.project2.imageUrl,
        imageHint: 'ntc-logo',
        gridSpan: 'col-span-12 lg:col-span-4',
        icon: 'ShieldCheck',
        isFavorite: true,
        userId: adminUser.id,
      },
      {
        title: 'IFS - Guru',
        description: 'A financial management SaaS platform, for building wealth, and improving your fundability, paving a clear, secure path to your financial goals.',
        keyFeatures: 'budgeting, financial tracking, cashflow analysis, financial statements, financial management, imani financial sevices, mvp',
        imageUrl: placeholderImages.project3.imageUrl,
        imageHint: 'ntc-logo',
        gridSpan: 'col-span-12 lg:col-span-6',
        icon: 'BookOpen',
        isFavorite: true,
        userId: adminUser.id,
      },
      {
        title: 'Innovation Hub',
        description: 'Seamlessly move from ideation to creation with clarity.',
        keyFeatures: 'Startup, SMEs, Business Strategy, NTC',
        imageUrl: placeholderImages.project4.imageUrl,
        imageHint: 'ntc-logo',
        gridSpan: 'col-span-12 lg:col-span-6',
        icon: 'Rocket',
        isFavorite: true,
        userId: adminUser.id,
      },
    ],
  });

  await prisma.testimonial.create({
    data: {
      quote: 'I absolutely would recommend working with Sean. He is absolutely fantastic. Professional, smart, communicative and really deeply knowledgeable.',
      author: 'Valued Client',
      title: 'Founder',
      avatarUrl: placeholderImages.testimonial1Image.imageUrl,
      avatarHint: 'A happy customer',
      userId: adminUser.id,
    },
  });

  await prisma.asset.createMany({
    data: [
    {
      id:1,
      name: 'logo',
      url: 'https://res.cloudinary.com/dm1bn7vkd/image/upload/v1769187527/nairobi_techcreative/ntc-logo_cv0t3n.png',
      alt: 'logo',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id:2,
      name: 'heroImage',
      url: 'https://res.cloudinary.com/dm1bn7vkd/image/upload/v1769188669/nairobi_techcreative/1769188621878_kgkj5u.png',
      alt: 'heroImage',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
    {
      id:3,
      name: 'founderImage',
      url: 'https://res.cloudinary.com/dm1bn7vkd/image/upload/v1769189197/nairobi_techcreative/IMG_20260123_202554_at0rca.jpg',
      alt: 'founderImage',
      createdAt: new Date(),
      updatedAt: new Date(),
    },
  ],
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
