import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/app/actions/posts';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { BlogPostClient } from './blog-post-client';
import type { Post } from '@/app/generated/prisma';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';

async function getPost(
  slug?: string
): Promise<{ post: Post | null; error: Error | null }> {
  try {
    const post = await getPostBySlug(slug);
    return { post, error: null };
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return { post: null, error: new DbUninitializedError() };
    }
    return { post: null, error: error as Error };
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

  const { post, error } = await getPost(params.slug);

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <BlogPostClient post={post} error={error} />
      <Footer />
    </div>
  );
}
