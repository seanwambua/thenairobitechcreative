'use client';

import { BlogPostCard } from '@/components/blog-post-card';
import type { Post } from '@/app/generated/prisma';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Terminal } from 'lucide-react';

interface BlogClientProps {
  posts: Post[] | null;
  error: Error | null;
}

export function BlogClient({ posts, error }: BlogClientProps) {
  if (error) {
    return (
      <main className="container flex-1 py-20 text-center">
        <Alert variant="destructive" className="mx-auto max-w-lg text-left">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Blog</AlertTitle>
          <AlertDescription>
            There was a problem fetching the blog posts. They may be temporarily
            unavailable.
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  if (!posts || posts.length === 0) {
    return (
      <main className="container flex-1 py-20 text-center">
        <h2 className="text-2xl font-semibold">No Posts Found</h2>
        <p className="mt-2 text-muted-foreground">
          There are no blog posts to display at the moment. Please check back
          later.
        </p>
      </main>
    );
  }

  return (
    <main className="flex-1">
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              From the Blog
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Explore our latest articles, insights, and stories from the tech
              world.
            </p>
          </div>

          <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
            {posts.map((post) => (
              <BlogPostCard key={post.id} post={post} />
            ))}
          </div>
        </div>
      </section>
    </main>
  );
}
