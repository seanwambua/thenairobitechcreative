import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { BlogClient } from './blog-client';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { getPosts } from '@/app/actions/posts';
import type { Post } from '@/app/generated/prisma';
import { getSetting } from '@/app/actions/settings';
import { DbUninitializedError } from '@/lib/errors';

async function getPageData(): Promise<{
  posts: Post[] | null;
  logoUrl: string | null;
  error: Error | null;
}> {
  try {
    const [posts, logoUrl] = await Promise.all([getPosts(), getSetting('logo')]);
    return { posts, logoUrl, error: null };
  } catch (error: any) {
    if (error.message.includes('no such table')) {
      return {
        posts: null,
        logoUrl: null,
        error: new DbUninitializedError(),
      };
    }
    return { posts: null, logoUrl: null, error: error as Error };
  }
}

export default async function BlogPage() {
  const { posts, logoUrl, error } = await getPageData();

  if (error instanceof DbUninitializedError) {
    return <DbUninitializedErrorComponent />;
  }

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header logoUrl={logoUrl} />
      <BlogClient posts={posts} error={error} />
      <Footer />
    </div>
  );
}
