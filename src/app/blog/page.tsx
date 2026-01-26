import { BlogClient } from './blog-client';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { getPostSummaries } from '@/app/actions/posts';
import type { PostSummary } from '@/lib/data';
import { DbUninitializedError } from '@/lib/errors';

async function getPageData(): Promise<{
  posts: PostSummary[] | null;
  error: Error | null;
}> {
  try {
    const posts = await getPostSummaries();
    return { posts, error: null };
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return {
        posts: null,
        error: new DbUninitializedError(),
      };
    }
    return { posts: null, error: error as Error };
  }
}

export default async function BlogPage() {
  const { posts, error } = await getPageData();

  if (error instanceof DbUninitializedError) {
    return <DbUninitializedErrorComponent />;
  }

  return <BlogClient posts={posts} error={error} />;
}
