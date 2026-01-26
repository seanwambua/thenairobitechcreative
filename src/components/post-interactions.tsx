'use client';

import React, { useOptimistic } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Twitter, Linkedin, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type Post } from '@/app/generated/prisma';
import { likePost } from '@/app/actions/posts';

interface PostInteractionsProps {
  post: Post;
  commentsCount: number;
}

export function PostInteractions({
  post,
  commentsCount,
}: PostInteractionsProps) {
  const { toast } = useToast();
  const [optimisticLikes, addOptimisticLike] = useOptimistic(
    post.likes,
    (state) => state + 1
  );

  const handleLike = async () => {
    addOptimisticLike(1);
    try {
      await likePost(post.id);
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: 'Failed to like post.',
      });
      // Revert optimistic update on error if needed, though revalidation will handle it.
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
    <section className="mt-8">
      <div className="flex items-center justify-between">
        <div className="flex items-center gap-4">
          <form action={handleLike}>
            <Button
              variant={'outline'}
              size="lg"
              className="flex items-center gap-2"
              type="submit"
            >
              <Heart className={`h-5 w-5`} />
              <span>{optimisticLikes}</span>
            </Button>
          </form>
          <div className="flex items-center gap-2 text-muted-foreground">
            <MessageCircle className="h-5 w-5" />
            <span>{commentsCount}</span>
          </div>
        </div>
        <div className="flex items-center gap-2">
          <span className="text-sm font-medium text-muted-foreground">
            Share:
          </span>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleShare('twitter')}
          >
            <Twitter className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleShare('linkedin')}
          >
            <Linkedin className="h-5 w-5" />
          </Button>
          <Button
            variant="ghost"
            size="icon"
            onClick={() => handleShare('link')}
          >
            <Link2 className="h-5 w-5" />
          </Button>
        </div>
      </div>
    </section>
  );
}
