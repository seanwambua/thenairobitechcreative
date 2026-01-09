'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { posts } from '@/lib/data';
import { Header } from '@/components/layout/header';
import { Footer } from '@/components/layout/footer';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { Separator } from '@/components/ui/separator';
import {
  Heart,
  MessageCircle,
  Twitter,
  Linkedin,
  Link2,
  Send,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast();
  const post = posts.find((p) => p.slug === params.slug);

  // Using state to simulate likes and comments since there's no backend
  const [likes, setLikes] = useState(post?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState(post?.comments || []);
  const [newComment, setNewComment] = useState('');

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

  const handleCommentSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (newComment.trim()) {
      setComments([
        ...comments,
        {
          author: 'Guest',
          text: newComment,
          avatarUrl: 'https://picsum.photos/seed/guest/40/40',
        },
      ]);
      setNewComment('');
      toast({
        title: 'Comment Posted!',
        description: 'Thanks for your feedback.',
      });
    }
  };

  return (
    <div className="flex min-h-screen flex-col bg-background">
      <Header />
      <main className="flex-1">
        <article className="container mx-auto max-w-4xl px-4 py-12">
          <header className="mb-8 text-center">
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

          <div className="relative mb-8 h-96 w-full overflow-hidden rounded-2xl shadow-lg">
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

          <div className="prose prose-lg mx-auto max-w-none text-foreground dark:prose-invert prose-p:leading-relaxed prose-headings:font-headline prose-headings:text-foreground">
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
                  <span>{comments.length}</span>
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
            <div className="mt-6 space-y-6">
              {comments.map((comment, index) => (
                <Card key={index}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div>
                      <p className="font-semibold">{comment.author}</p>
                      <p className="text-muted-foreground">{comment.text}</p>
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit} className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">Leave a Comment</h3>
                  <Textarea
                    placeholder="Write your comment here..."
                    className="mt-4"
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    rows={4}
                  />
                  <div className="mt-4 flex justify-end">
                    <Button type="submit">
                      Post Comment <Send className="ml-2 h-4 w-4" />
                    </Button>
                  </div>
                </CardContent>
              </Card>
            </form>
          </section>
        </article>
      </main>
      <Footer />
    </div>
  );
}
