import { MetadataRoute } from 'next'
import prisma from '@/lib/prisma'

/**
 * Dynamic Sitemap Generator
 * This file generates the sitemap.xml for search engines.
 * It includes static routes and dynamic blog post routes.
 */
export default async function sitemap(): Promise<MetadataRoute.Sitemap> {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nairobitechcreative.com'

  // Fetch all published blog post slugs from the database for indexing
  let blogEntries: MetadataRoute.Sitemap = []
  try {
    const posts = await prisma.post.findMany({
      select: {
        slug: true,
        updatedAt: true,
      },
    })
    
    blogEntries = posts.map((post) => ({
      url: `${baseUrl}/blog/${post.slug}`,
      lastModified: post.updatedAt,
      changeFrequency: 'weekly' as const,
      priority: 0.7,
    }))
  } catch (error) {
    console.error('[SEO_SITEMAP_FETCH_ERROR]:', error)
    // Gracefully handle database connection issues during build/generation
  }

  // Define core static routes
  const staticRoutes = [
    { url: '', priority: 1.0, changeFrequency: 'daily' as const },
    { url: '/about', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/services', priority: 0.9, changeFrequency: 'monthly' as const },
    { url: '/pricing', priority: 0.8, changeFrequency: 'monthly' as const },
    { url: '/blog', priority: 0.9, changeFrequency: 'daily' as const },
    { url: '/projects', priority: 0.9, changeFrequency: 'weekly' as const },
  ].map((route) => ({
    url: `${baseUrl}${route.url}`,
    lastModified: new Date(),
    changeFrequency: route.changeFrequency,
    priority: route.priority,
  }))

  return [...staticRoutes, ...blogEntries]
}
