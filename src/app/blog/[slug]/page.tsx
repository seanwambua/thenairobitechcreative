import { notFound } from 'next/navigation';
import { getPostBySlug } from '@/app/actions/posts';
import { DbUninitializedError } from '@/lib/errors';
import { BlogPostClient } from './blog-post-client';
import type { Post } from '@/app/generated/prisma';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';

export const dynamic = 'force-dynamic';

async function getPageData(
  slug?: string
): Promise<{ post: Post | null; error: Error | null }> {
  try {
    const postPromise = slug ? getPostBySlug(slug) : Promise.resolve(null);
    const post = await postPromise;
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

  const { post, error } = await getPageData(params.slug);

  if (error instanceof DbUninitializedError) {
    return <DbUninitializedErrorComponent />;
  }

  return <BlogPostClient postData={post} error={error} />;
}
