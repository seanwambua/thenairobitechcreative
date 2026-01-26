import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/app/actions/posts';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { BlogPostClient } from './blog-post-client';
import type { Post } from '@/app/generated/prisma';

async function getPost(
  slug?: string
): Promise<{ post: Post | null; error: Error | null }> {
  if (!slug) {
    notFound();
  }
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

  return <BlogPostClient post={post} error={error} />;
}
