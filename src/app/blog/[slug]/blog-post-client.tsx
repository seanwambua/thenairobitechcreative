'use client';

import Image from 'next/image';
import Link from 'next/link';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Separator } from '@/components/ui/separator';
import { PostInteractions } from '@/components/post-interactions';
import { Comments } from '@/components/comments';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { Button } from '@/components/ui/button';
import { Terminal, ArrowLeft } from 'lucide-react';
import type { Post, Comment as CommentType, User } from '@/app/generated/prisma';

export function BlogPostClient({
  postData,
  comments,
  likes,
  userHasLiked,
  error,
}: {
  postData: Post | null;
  comments: (CommentType & { user: User })[];
  likes: number;
  userHasLiked: boolean;
  error: Error | null;
}) {
  if (error) {
    // Generic error for other data fetching issues
    return (
      <article className="container flex-1 py-20 text-center">
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
      </article>
    );
  }

  // Handle case where post is not found or slug was invalid.
  if (!postData) {
    return null; // The page will show a 404 from notFound()
  }

  return (
    <article className="container mx-auto max-w-4xl px-4 py-12">
      <header className="mb-12 text-center">
        <h1 className="font-headline text-4xl font-extrabold tracking-tight text-foreground sm:text-5xl md:text-6xl">
          {postData.title}
        </h1>
        <div className="mt-6 flex items-center justify-center gap-4">
          <Avatar className="h-12 w-12 border-2 border-primary">
            <AvatarImage
              src={postData.authorAvatarUrl}
              alt={postData.author}
              data-ai-hint={postData.authorAvatarHint}
            />
            <AvatarFallback>{postData.author.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <p className="font-semibold">{postData.author}</p>
            <p className="text-sm text-muted-foreground">
              {new Date(postData.createdAt).toLocaleDateString('en-US', {
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
          src={postData.imageUrl}
          alt={postData.title}
          fill
          className="object-cover"
          sizes="(max-width: 768px) 100vw, 50vw"
          data-ai-hint={postData.imageHint}
          priority
        />
      </div>

      <div className="prose prose-lg mx-auto max-w-none text-pretty text-foreground dark:prose-invert prose-headings:font-headline prose-headings:text-foreground prose-p:leading-relaxed">
        <p className="lead text-xl text-muted-foreground">
          {postData.description}
        </p>
        <div dangerouslySetInnerHTML={{ __html: postData.content }} />
      </div>

      <Separator className="my-12" />

      <PostInteractions
        post={postData}
        likes={likes}
        hasLiked={userHasLiked}
        commentsCount={comments.length}
      />

      <Comments postId={postData.id} comments={comments} />
    </article>
  );
}
