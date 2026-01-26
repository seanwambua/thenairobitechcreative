import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/app/actions/posts';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { BlogPostClient } from './blog-post-client';
import type { Post } from '@/app/generated/prisma';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { getSetting } from '@/app/actions/settings';

export const dynamic = 'force-dynamic';

async function getPageData(
  slug?: string
): Promise<{ post: Post | null; logoUrl: string | null; error: Error | null }> {
  try {
    const [post, logoUrl] = await Promise.all([
      getPostBySlug(slug),
      getSetting('logo'),
    ]);
    return { post, logoUrl, error: null };
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return { post: null, logoUrl: null, error: new DbUninitializedError() };
    }
    return { post: null, logoUrl: null, error: error as Error };
  }
}

export default async function BlogPostPage({
  params,
}: {
  params: { slug?: string };
}) {
  if (!params.slug) {
    notFound();
  }

  const { post, logoUrl, error } = await getPageData(params.slug);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header logoUrl={logoUrl} />
      <BlogPostClient post={post} error={error} />
      <Footer />
    </div>
  );
}
