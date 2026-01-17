
import { PrismaClient } from '../src/generated/client';

const db = new PrismaClient();

const placeholderImages = {
  inventory: {
    imageUrl: '/placeholder/inventory.webp',
    imageHint: 'A well-organized warehouse with shelves of neatly arranged boxes, a worker scanning a barcode on a package, and a digital overlay showing inventory data and analytics. The atmosphere is efficient, modern, and tech-driven.'
  },
  design: {
    imageUrl: '/placeholder/design.webp',
    imageHint: 'A vibrant and collaborative design studio. A large interactive whiteboard displays a colorful UI design, with a diverse team of designers sketching, prototyping on tablets, and brainstorming. The space is filled with creative energy and natural light.'
  },
  finance: {
    imageUrl: '/placeholder/finance.webp',
    imageHint: 'A sleek and modern office environment. A financial analyst is presenting a detailed cash flow forecast on a large screen to a group of executives. The screen shows charts, graphs, and currency symbols (KES, USD), indicating a sophisticated financial analysis for a startup.'
  },
  lms: {
    imageUrl: '/placeholder/lms.webp',
    imageHint: 'A person in a rural setting with limited internet access, using a tablet to watch an educational video. The screen shows a progress bar and a download icon, indicating an offline-first learning experience. The background is a serene, natural landscape.'
  },
  enterpriseA: {
    imageUrl: '/placeholder/enterprise-a.webp',
    imageHint: 'An abstract representation of a scalable web platform. A network of interconnected nodes and data streams, with a central hub representing an integrated CRM system. The design is clean, futuristic, and conveys a sense of high availability and robust infrastructure.'
  },
  enterpriseB: {
    imageUrl: '/placeholder/enterprise-b.webp',
    imageHint: 'A secure and compliant enterprise solution. A digital fortress with a shield icon, representing data security and compliance. An API gateway is shown as a well-guarded entrance, with data flowing in and out in an orderly and secure manner. The overall impression is one of trust and reliability.'
  },
  testimonial1: {
    imageUrl: '/placeholder/testimonial-1.webp',
    imageHint: 'A confident and professional woman in a modern office, dressed in business casual attire. She has a warm and approachable smile, conveying trustworthiness and success. The background is slightly blurred, keeping the focus on her.'
  },
  testimonial2: {
    imageUrl: '/placeholder/testimonial-2.webp',
    imageHint: 'An enthusiastic and innovative man, possibly a startup founder, in a creative workspace. He is gesturing passionately as he speaks, conveying his excitement and vision. The background is a mix of whiteboards with diagrams and sticky notes.'
  },
  testimonial3: {
    imageUrl: '/placeholder/testimonial-3.webp',
    imageHint: 'A sharp and analytical woman, a CFO or financial expert, in a formal corporate setting. She is looking directly at the camera with a serious and intelligent expression. The background includes financial charts and graphs on a monitor.'
  },
  testimonial4: {
    imageUrl: '/placeholder/testimonial-4.webp',
    imageHint: 'A creative and artistic man, a designer or artist, in a studio filled with colorful artwork and design tools. He is smiling and looking relaxed, proud of his work. The background is a source of inspiration and creativity.'
  },
  blog1: {
    imageUrl: '/placeholder/blog-1.webp',
    imageHint: 'An image showing the rapid adoption of mobile technology in Africa. A bustling street market with people from all walks of life using their smartphones for various activities - making payments, browsing content, and communicating. The image is vibrant and dynamic.'
  },
  blog2: {
    imageUrl: '/placeholder/blog-2.webp',
    imageHint: 'An abstract image representing the future of fintech in Africa. It combines traditional African patterns with futuristic digital elements, such as glowing circuit lines and data visualizations. The image suggests a blend of culture and technology.'
  },
  blog3: {
    imageUrl: '/placeholder/blog-3.webp',
    imageHint: 'An inclusive and accessible digital interface. The image shows a user interacting with a mobile app that has features like high-contrast mode, large fonts, and voice commands. It represents a commitment to designing for all users, regardless of their abilities.'
  },
  hero: {
    imageUrl: '/placeholder/hero.webp',
    imageHint: 'A panoramic view of the Nairobi skyline at sunset, with a focus on the city's dynamic and growing tech hub. The image blends natural beauty with urban development, symbolizing innovation and opportunity in the African market.'
  },
  founder: {
    imageUrl: '/placeholder/founder.webp',
    imageHint: 'A portrait of a visionary founder, looking towards the future with a sense of purpose and determination. The background is a mix of natural African landscapes and digital code, representing a bridge between heritage and innovation.'
  }
};


const initialProjects = [
  {
    title: 'Inventory Management',
    description: 'Real-time supply chain tracking with M-Pesa API integration for SMEs.',
    keyFeatures: ['Real-time Tracking', 'M-Pesa API', 'Automated Reordering'],
    imageUrl: placeholderImages.inventory.imageUrl,
    imageHint: placeholderImages.inventory.imageHint,
    gridSpan: 'col-span-1 md:col-span-1',
    icon: 'Boxes',
  },
  {
    title: 'Graphic Design Workbench',
    description: 'Collaborative canvas for African creatives to build and share their work.',
    keyFeatures: ['Collaborative Canvas', 'Vector Tools', 'Asset Library'],
    imageUrl: placeholderImages.design.imageUrl,
    imageHint: placeholderImages.design.imageHint,
    gridSpan: 'col-span-1 sm:col-span-2 lg:col-span-2',
    icon: 'PenTool',
  },
  {
    title: 'Financial Management Tool',
    description: 'Multi-currency (KES/USD) cash flow forecasting for African startups.',
    keyFeatures: ['KES/USD Support', 'Cash Flow Forecasting', 'Investor Reports'],
    imageUrl: placeholderImages.finance.imageUrl,
    imageHint: placeholderImages.finance.imageHint,
    gridSpan: 'col-span-1 sm:col-span-2 lg:col-span-2',
    icon: 'LineChart',
  },
  {
    title: 'LMS',
    description: 'Offline-first video modules for remote learning in low-bandwidth areas.',
    keyFeatures: ['Offline-First', 'Video Modules', 'Progress Syncing'],
    imageUrl: placeholderImages.lms.imageUrl,
    imageHint: placeholderImages.lms.imageHint,
    gridSpan: 'col-span-1 md:col-span-1',
    icon: 'BookOpen',
  },
  {
    title: 'Enterprise Web Platform',
    description: 'Scalable web platform with a fully integrated CRM system.',
    keyFeatures: ['Integrated CRM', 'Microservices', 'High Availability'],
    imageUrl: placeholderImages.enterpriseA.imageUrl,
    imageHint: placeholderImages.enterpriseA.imageHint,
    gridSpan: 'col-span-1 md:col-span-1',
    icon: 'Server',
  },
  {
    title: 'Enterprise Web Platform',
    description: 'Secure, compliant enterprise solution with advanced CRM capabilities.',
    keyFeatures: ['Advanced CRM', 'API Gateway'],
    imageUrl: placeholderImages.enterpriseB.imageUrl,
    imageHint: placeholderImages.enterpriseB.imageHint,
    gridSpan: 'col-span-1 sm:col-span-2 lg:col-span-2',
    icon: 'Globe',
  },
];

const initialTestimonials = [
  {
    quote: "Working with Nairobi Tech Creative was a game-changer. Their insights into the African market and their technical execution are second to none.",
    author: "Jane Doe",
    title: "CEO, AgriConnect",
    avatarUrl: placeholderImages.testimonial1.imageUrl,
    avatarHint: placeholderImages.testimonial1.imageHint,
  },
  {
    quote: "The team's dedication to building scalable, offline-first solutions helped us reach communities we never thought possible. Truly innovative.",
    author: "John Smith",
    title: "Founder, EduScale",
    avatarUrl: placeholderImages.testimonial2.imageUrl,
    avatarHint: placeholderImages.testimonial2.imageHint,
  },
  {
    quote: "Their financial forecasting tool, with its multi-currency support, was essential for our seed round. They understand the startup journey in Africa.",
    author: "Amina Okoro",
    title: "CFO, FinTech Innovators",
    avatarUrl: placeholderImages.testimonial3.imageUrl,
    avatarHint: placeholderImages.testimonial3.imageHint,
  },
  {
    quote: "The collaborative design platform they built for us has become the central hub for our creative community. The user experience is flawless.",
    author: "Kwame Annan",
    title: "Director, Creative Guild Africa",
    avatarUrl: placeholderImages.testimonial4.imageUrl,
    avatarHint: placeholderImages.testimonial4.imageHint,
  },
];

const initialPosts = [
  {
    slug: 'the-rise-of-mobile-first-solutions-in-africa',
    title: 'The Rise of Mobile-First Solutions in Africa',
    description: 'Exploring how mobile technology is shaping the future of business and daily life across the continent.',
    content: "Africa is not just a mobile-first continent; it's a mobile-only continent for a vast majority of its population. This paradigm shift has led to an explosion of innovation, with developers and entrepreneurs creating solutions tailored specifically for mobile users. From fintech to healthcare, mobile technology is leapfrogging traditional infrastructure, providing access to essential services for millions.\n\nIn this post, we'll explore the key drivers behind this trend, including the proliferation of affordable smartphones, expanding mobile network coverage, and the youthful, tech-savvy demographics of the continent. We'll also showcase some of the most exciting mobile-first companies that are making a global impact from their African headquarters. The future is mobile, and Africa is leading the charge.",
    imageUrl: placeholderImages.blog1.imageUrl,
    imageHint: placeholderImages.blog1.imageHint,
    author: 'Jalen Doe',
    authorAvatarUrl: placeholderImages.testimonial1.imageUrl,
    authorAvatarHint: placeholderImages.testimonial1.imageHint,
    likes: 128,
    comments: '',
  },
  {
    slug: 'fintech-innovation-beyond-mobile-money',
    title: 'FinTech Innovation: Beyond Mobile Money',
    description: 'A deep dive into the next wave of financial technology emerging from African tech hubs.',
    content: "While mobile money platforms like M-Pesa revolutionized financial inclusion in Africa, the story doesn't end there. A new wave of fintech innovation is building on this foundation, offering more complex financial products to a rapidly growing consumer base. We're seeing the rise of digital-only banks, micro-investment platforms, and AI-powered credit scoring systems that are democratizing access to wealth creation tools.\n\nThese new services are tackling everything from cross-border payments to personal financial management, all through a mobile-centric lens. The regulatory landscape is evolving to keep pace, creating a dynamic and sometimes challenging environment for innovators. This article examines the startups leading the charge and the potential for these African-born solutions to be adapted for global markets.",
    imageUrl: placeholderImages.blog2.imageUrl,
    imageHint: placeholderImages.blog2.imageHint,
    author: 'Maria Garcia',
    authorAvatarUrl: placeholderImages.testimonial3.imageUrl,
    authorAvatarHint: placeholderImages.testimonial3.imageHint,
    likes: 95,
    comments: '',
  },
  {
    slug: 'designing-for-accessibility-in-a-diverse-market',
    title: 'Designing for Accessibility in a Diverse Market',
    description: 'Key principles and practical tips for creating inclusive digital products for all users.',
    content: "Designing for the African continent means designing for an incredible diversity of languages, cultures, and levels of digital literacy. It also means accounting for varying device capabilities and network conditions. True accessibility goes beyond screen readers and alt text; it's about creating products that are intuitive, resilient, and respectful of the user's context.\n\nThis post outlines a framework for inclusive design that we follow at The Nairobi Tech Creative. We'll cover topics like offline-first architecture, performance optimization for low-end devices, localization best practices, and the importance of user research with diverse community groups. By prioritizing accessibility from day one, we can build products that truly serve everyone.",
    imageUrl: placeholderImages.blog3.imageUrl,
    imageHint: placeholderImages.blog3.imageHint,
    author: 'David Kim',
    authorAvatarUrl: placeholderImages.testimonial2.imageUrl,
    authorAvatarHint: placeholderImages.testimonial2.imageHint,
    likes: 210,
    comments: '',
  },
];


async function main() {
  console.log('Start seeding...');

  // Clear existing data
  await db.post.deleteMany();
  await db.project.deleteMany();
  await db.testimonial.deleteMany();
  await db.settings.deleteMany();

  // Seed Projects
  for (const project of initialProjects) {
    await db.project.create({
      data: {
        ...project,
        keyFeatures: project.keyFeatures.join(','),
      }
    });
  }

  // Seed Posts
  for (const post of initialPosts) {
    await db.post.create({ data: post });
  }

  // Seed Testimonials
  for (const testimonial of initialTestimonials) {
    await db.testimonial.create({ data: testimonial });
  }

  // Seed Settings
  await db.settings.createMany({
    data: [
      { key: 'heroImage', value: placeholderImages.hero.imageUrl },
      { key: 'logo', value: null },
      { key: 'founderImage', value: placeholderImages.founder.imageUrl },
    ]
  });

  console.log('Seeding finished.');
}

main()
  .catch((e) => {
    console.error(e);
    process.exit(1);
  })
  .finally(async () => {
    await db.$disconnect();
  });
