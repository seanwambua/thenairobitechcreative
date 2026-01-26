'use client';

import { BlogPostCard } from '@/components/blog-post-card';
import { Card, CardContent } from '@/components/ui/card';
import { ArrowRight, Terminal } from 'lucide-react';
import Link from 'next/link';
import type { Post } from '@/app/generated/prisma';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Skeleton } from '@/components/ui/skeleton';
import { DbUninitializedError as DbUninitializedErrorComponent } from '@/components/db-uninitialized-error';
import { DbUninitializedError } from '@/lib/errors';

function BlogSkeleton() {
  return (
    <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
      {[...Array(3)].map((_, i) => (
        <div
          key={i}
          className="flex flex-col space-y-3 rounded-lg border bg-card p-4"
        >
          <Skeleton className="h-[224px] w-full rounded-lg" />
          <div className="space-y-2 pt-2">
            <Skeleton className="h-6 w-3/4" />
            <Skeleton className="h-4 w-full" />
            <Skeleton className="h-4 w-2/3" />
          </div>
        </div>
      ))}
    </div>
  );
}

export function BlogClient({
  posts,
  error,
}: {
  posts: Post[] | null;
  error: Error | null;
}) {
  if (error) {
    if (error instanceof DbUninitializedError) {
      return (
        <main className="flex-1">
          <DbUninitializedErrorComponent />
        </main>
      );
    }
    return (
      <main className="container flex-1 py-20">
        <Alert variant="destructive">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Blog Posts</AlertTitle>
          <AlertDescription>
            There was a problem fetching the articles. They may be temporarily
            unavailable. Please try refreshing the page.
          </AlertDescription>
        </Alert>
      </main>
    );
  }

  const featuredPosts = posts?.slice(0, 3) || [];
  const otherArticles = posts?.slice(3) || [];

  return (
    <main className="flex-1">
      <section className="py-20 lg:py-32">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-16 max-w-3xl text-center">
            <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl">
              From the Hub
            </h1>
            <p className="mt-4 text-lg text-muted-foreground">
              Insights, stories, and updates from the heart of African tech
              innovation.
            </p>
          </div>
          {!posts ? (
            <BlogSkeleton />
          ) : posts.length > 0 ? (
            <div className="grid grid-cols-1 gap-8 md:grid-cols-2 lg:grid-cols-3">
              {featuredPosts.map((post) => (
                <BlogPostCard key={post.id} post={post} />
              ))}
            </div>
          ) : (
            <p className="text-center text-muted-foreground">
              No posts yet. Check back soon!
            </p>
          )}
        </div>
      </section>

      <section className="border-t py-20 lg:py-24">
        <div className="container mx-auto px-4">
          <div className="mx-auto mb-12 max-w-3xl text-center">
            <h2 className="font-headline text-3xl font-extrabold tracking-tight text-foreground sm:text-4xl">
              Other Articles
            </h2>
            <p className="mt-3 text-lg text-muted-foreground">
              Explore more topics and insights from our team of experts.
            </p>
          </div>
          <div className="mx-auto max-w-2xl">
            <div className="space-y-4">
              {posts && otherArticles.length > 0 ? (
                otherArticles.map((article) => (
                  <Link
                    href={`/blog/${article.slug}`}
                    className="group block"
                    key={article.id}
                  >
                    <Card className="transition-all duration-300 hover:border-primary hover:shadow-lg hover:shadow-primary/10">
                      <CardContent className="flex items-center justify-between p-6">
                        <h3 className="font-semibold text-foreground">
                          {article.title}
                        </h3>
                        <ArrowRight className="h-5 w-5 text-muted-foreground transition-transform duration-300 group-hover:translate-x-1 group-hover:text-primary" />
                      </CardContent>
                    </Card>
                  </Link>
                ))
              ) : posts && posts.length > 0 ? null : !posts ? (
                <div className="space-y-4">
                  <Skeleton className="h-20 w-full" />
                  <Skeleton className="h-20 w-full" />
                </div>
              ) : (
                <p className="text-center text-muted-foreground">
                  No other articles available.
                </p>
              )}
            </div>
          </div>
        </div>
      </section>
    </main>
  );
}
