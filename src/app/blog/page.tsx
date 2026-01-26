import { BlogClient } from './blog-client';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { getPosts } from '@/app/actions/posts';
import type { Post } from '@/app/generated/prisma';
import { DbUninitializedError } from '@/lib/errors';

async function getPageData(): Promise<{
  posts: Post[] | null;
  error: Error | null;
}> {
  try {
    const posts = await getPosts();
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
