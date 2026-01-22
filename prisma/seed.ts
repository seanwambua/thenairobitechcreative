import { PrismaClient } from '../src/app/generated/prisma'

const prisma = new PrismaClient()

async function main() {
  console.log('Starting database seed...')

  // Create a sample user
  await prisma.user.create({
    data: {
      email: 'example@example.com',
      name: 'Test User',
    },
  })

  // Create a sample post
  await prisma.post.create({
    data: {
      slug: 'my-first-post',
      title: 'My First Post',
      description: 'This is the description of my first post.',
      content: 'This is the content of my first post.',
      imageUrl: 'https://example.com/image.jpg',
      imageHint: 'A beautiful landscape',
      author: 'Test User',
      authorAvatarUrl: 'https://example.com/avatar.jpg',
      authorAvatarHint: "The author's avatar",
      likes: 10,
      comments: '[]',
    },
  })

  // Create a sample project
  await prisma.project.create({
    data: {
      title: 'My First Project',
      description: 'This is the description of my first project.',
      keyFeatures: '["Feature 1", "Feature 2", "Feature 3"]',
      imageUrl: 'https://example.com/project.jpg',
      imageHint: 'A screenshot of the project',
      gridSpan: 'col-span-1',
      icon: 'Code',
    },
  })

  // Create a sample testimonial
  await prisma.testimonial.create({
    data: {
      quote: 'This is a great product!',
      author: 'Happy Customer',
      title: 'CEO of a company',
      avatarUrl: 'https://example.com/customer.jpg',
      avatarHint: 'A happy customer',
    },
  })

  // Create some sample settings
  await prisma.settings.createMany({
    data: [
      { key: 'setting1', value: 'value1' },
      { key: 'setting2', value: 'value2' },
    ],
  })


  console.log('Database seeded successfully.')
}

main()
  .catch((e) => {
    console.error('Error during database seeding:', e)
    process.exit(1)
  })
  .finally(async () => {
    await prisma.$disconnect()
  })
