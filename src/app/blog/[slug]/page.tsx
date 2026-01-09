'use client';

import React, { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { posts, PostComment } from '@/lib/data';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  MessageCircle,
  Twitter,
  Linkedin,
  Link2,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast();
  const { slug } = params;
  const post = posts.find((p) => p.slug === slug);

  const [likes, setLikes] = useState(post?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const commentsCount = post?.comments.length || 0;

  if (!post) {
    notFound();
  }

  const handleLike = () => {
    if (isLiked) {
      setLikes(likes - 1);
      setIsLiked(false);
    } else {
      setLikes(likes + 1);
      setIsLiked(true);
    }
  };

  const handleShare = (platform: 'twitter' | 'linkedin' | 'link') => {
    const url = window.location.href;
    const text = `Check out this article: ${post.title}`;
    let shareUrl = '';

    if (platform === 'twitter') {
      shareUrl = `https://twitter.com/intent/tweet?url=${encodeURIComponent(
        url
      )}&text=${encodeURIComponent(text)}`;
    } else if (platform === 'linkedin') {
      shareUrl = `https://www.linkedin.com/sharing/share-offsite/?url=${encodeURIComponent(
        url
      )}`;
    } else {
      navigator.clipboard.writeText(url).then(() => {
        toast({
          title: 'Link Copied!',
          description: 'The article link has been copied to your clipboard.',
        });
      });
      return;
    }
    window.open(shareUrl, '_blank');
  };

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
                <p className="text-sm text-muted-foreground">{post.date}</p>
              </div>
            </div>
          </header>

          <div className="relative mb-12 h-96 w-full overflow-hidden rounded-2xl shadow-lg">
            <Image
              src={post.imageUrl}
              alt={post.title}
              fill
              className="object-cover"
              sizes="(max-width: 768px) 100vw, (max-width: 1200px) 75vw, 50vw"
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

          <section className="mt-8">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-4">
                <Button
                  variant={isLiked ? 'default' : 'outline'}
                  size="lg"
                  onClick={handleLike}
                  className="flex items-center gap-2"
                >
                  <Heart className={`h-5 w-5 ${isLiked ? 'fill-current' : ''}`} />
                  <span>{likes}</span>
                </Button>
                <div className="flex items-center gap-2 text-muted-foreground">
                  <MessageCircle className="h-5 w-5" />
                  <span>{commentsCount}</span>
                </div>
              </div>
              <div className="flex items-center gap-2">
                <span className="text-sm font-medium text-muted-foreground">Share:</span>
                <Button variant="ghost" size="icon" onClick={() => handleShare('twitter')}>
                  <Twitter className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleShare('linkedin')}>
                  <Linkedin className="h-5 w-5" />
                </Button>
                <Button variant="ghost" size="icon" onClick={() => handleShare('link')}>
                  <Link2 className="h-5 w-5" />
                </Button>
              </div>
            </div>
          </section>

          <section className="mt-12">
            <h2 className="font-headline text-3xl font-bold">Comments</h2>
             <Card className="mt-6">
                <CardContent className="p-6 text-center">
                    <h3 className="text-lg font-semibold">Comments Coming Soon</h3>
                    <p className="mt-2 text-muted-foreground">
                        We're working on a new commenting system. User authentication will be required. Please check back later!
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
