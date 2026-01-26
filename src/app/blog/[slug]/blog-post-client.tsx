'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PostInteractions } from '@/components/post-interactions';
import { DbUninitializedError } from '@/components/db-uninitialized-error';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Terminal, ArrowLeft } from 'lucide-react';
import type { Post } from '@/app/generated/prisma';

export function BlogPostClient({
  post,
  error,
}: {
  post: Post | null;
  error: Error | null;
}) {
  if (error) {
    if (error instanceof DbUninitializedError) {
      return (
        <main className="flex-1">
          <DbUninitializedError />
        </main>
      );
    }
    // Generic error for other data fetching issues
    return (
      <main className="container flex-1 py-20 text-center">
        <Alert variant="destructive" className="mx-auto max-w-lg text-left">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Error Loading Post</AlertTitle>
          <AlertDescription>
            There was a problem fetching this article. It may be temporarily
            unavailable.
          </AlertDescription>
        </Alert>
        <div className="mt-8">
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  // Handle case where post is not found or slug was invalid.
  if (!post) {
    return (
      <main className="container flex-1 py-20 text-center">
        <Alert variant="destructive" className="mx-auto max-w-lg text-left">
          <Terminal className="h-4 w-4" />
          <AlertTitle>Post Not Found</AlertTitle>
          <AlertDescription>
            The article you are looking for does not exist or has been moved.
          </AlertDescription>
        </Alert>
        <div className="mt-8">
          <Button asChild>
            <Link href="/blog">
              <ArrowLeft className="mr-2 h-4 w-4" />
              Back to Blog
            </Link>
          </Button>
        </div>
      </main>
    );
  }

  const commentsCount = 0;

  return (
    <main className="flex-1">
      <article className="container mx-auto max-w-4xl px-4 py-12">
        <header className="mb-12 text-center">
          <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
            {post.title}
          </h1>
          <div className="mt-6 flex items-center justify-center gap-4">
            <Avatar className="h-12 w-12 border-2 border-primary">
              <AvatarImage
                src={post.authorAvatarUrl}
                alt={post.author}
                data-ai-hint={post.authorAvatarHint}
              />
              <AvatarFallback>{post.author.charAt(0)}</AvatarFallback>
            </Avatar>
            <div>
              <p className="font-semibold">{post.author}</p>
              <p className="text-sm text-muted-foreground">
                {new Date(post.createdAt).toLocaleDateString('en-US', {
                  month: 'short',
                  day: 'numeric',
                  year: 'numeric',
                })}
              </p>
            </div>
          </div>
        </header>

        <div className="relative mb-12 h-[600px] w-full overflow-hidden rounded-2xl shadow-lg">
          <Image
            src={post.imageUrl}
            alt={post.title}
            fill
            className="object-cover"
            sizes="(max-width: 768px) 100vw, 50vw"
            data-ai-hint={post.imageHint}
            priority
          />
        </div>

        <div className="prose prose-lg dark:prose-invert prose-p:leading-relaxed prose-headings:font-headline prose-headings:text-foreground mx-auto max-w-none text-pretty text-foreground">
          <p className="lead text-xl text-muted-foreground">
            {post.description}
          </p>
          {post.content.split('\n\n').map((paragraph, index) => (
            <p key={index}>{paragraph}</p>
          ))}
        </div>

        <Separator className="my-12" />

        <PostInteractions post={post} commentsCount={commentsCount} />

        <section className="mt-12">
          <h2 className="font-headline text-3xl font-bold">Comments</h2>
          <Card className="mt-6">
            <CardContent className="p-6 text-center">
              <h3 className="text-lg font-semibold">Comments Coming Soon</h3>
              <p className="mt-2 text-muted-foreground">
                We're working on a new commenting system. User authentication
                will be required. Please check back later!
              </p>
            </CardContent>
          </Card>
        </section>
      </article>
    </main>
  );
}
