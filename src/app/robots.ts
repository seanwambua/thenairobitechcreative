import { MetadataRoute } from 'next'
 
/**
 * Robots.txt Configuration
 * Directs search engine crawlers on which areas of the site to index.
 */
export default function robots(): MetadataRoute.Robots {
  const baseUrl = process.env.NEXT_PUBLIC_APP_URL || 'https://nairobitechcreative.com'
  
  return {
    rules: {
      userAgent: '*',
      allow: '/',
      disallow: [
        '/dashboard/',    // Prevent indexing of the admin area
        '/api/',          // Prevent indexing of internal API routes
        '/unauthorized',  // Prevent indexing of error pages
        '/login',         // Authentication pages don't need indexing
        '/signup',
      ],
    },
    sitemap: `${baseUrl}/sitemap.xml`,
  }
}
