import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlogClient } from './blog-client';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { getPosts } from '@/app/actions/posts';
import type { Post } from '@/app/generated/prisma';

async function getInitialPosts(): Promise<{ posts: Post[]; error: null } | { posts: null; error: Error }> {
  try {
    const posts = await getPosts();
    return { posts, error: null };
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return { posts: null, error: new DbUninitializedError() as Error };
    }
    return { posts: null, error: error as Error };
  }
}

export default async function BlogPage() {
  const { posts, error } = await getInitialPosts();

  if (error instanceof DbUninitializedError) {
    return <DbUninitializedError />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <BlogClient posts={posts} error={error} />
      <Footer />
    </div>
  );
}
