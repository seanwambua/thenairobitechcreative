import { getPostBySlug } from '@/app/actions/posts';
import { DbUninitializedError } from '@/lib/errors';
import { BlogPostClient } from './blog-post-client';
import type { Post } from '@/app/generated/prisma';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { notFound } from 'next/navigation';

export const dynamic = 'force-dynamic';

async function getPageData(
  slug: string
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
  params: { slug: string };
}) {
  const { post, error } = await getPageData(params.slug);

  if (error instanceof DbUninitializedError) {
    return <DbUninitializedErrorComponent />;
  }

  if (error) {
    return <BlogPostClient postData={null} error={error} />;
  }

  if (!post) {
    notFound();
  }

  return <BlogPostClient postData={post} error={null} />;
}
