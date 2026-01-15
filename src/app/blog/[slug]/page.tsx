'use client';
import { useEffect } from 'react';
import { notFound, useParams } from 'next/navigation';
import Image from 'next/image';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { PostInteractions } from '@/components/post-interactions';
import { usePostStore } from '@/store/posts';
import { Loader2 } from 'lucide-react';

export default function BlogPostPage() {
  const { slug } = useParams<{ slug: string }>();
  const { posts, fetchPosts, isLoading } = usePostStore();
  
  useEffect(() => {
    if (posts.length === 0) {
      fetchPosts();
    }
  }, [posts.length, fetchPosts]);

  const post = posts.find((p) => p.slug === slug);

  if (isLoading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-background">
        <Loader2 className="h-12 w-12 animate-spin" />
      </div>
    );
  }

  if (!post) {
    // Return a not-found page if the post isn't found after loading
    return notFound();
  }

  // Comments are not implemented as an array
  const commentsCount = 0;

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
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
                <p className="text-sm text-muted-foreground">{new Date(post.createdAt).toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' })}</p>
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

          <div className="prose prose-lg mx-auto max-w-none text-pretty text-foreground dark:prose-invert prose-p:leading-relaxed prose-headings:font-headline prose-headings:text-foreground">
            <p className="lead text-xl text-muted-foreground">{post.description}</p>
            {post.content.split('\n\n').map((paragraph, index) => (
              <p key={index}>{paragraph}</p>
            ))}
          </div>

          <Separator className="my-12" />

          <PostInteractions initialLikes={post.likes} commentsCount={commentsCount} postTitle={post.title} />

          <section className="mt-12">
            <h2 className="font-headline text-3xl font-bold">Comments</h2>
            <Card className="mt-6">
              <CardContent className="p-6 text-center">
                <h3 className="text-lg font-semibold">Comments Coming Soon</h3>
                <p className="mt-2 text-muted-foreground">
                  We're working on a new commenting system. User authentication will be required.
                  Please check back later!
                </p>
              </CardContent>
            </Card>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
