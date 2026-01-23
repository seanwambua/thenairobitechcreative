'use client';

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Twitter, Linkedin, Link2 } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';

interface PostInteractionsProps {
  initialLikes: number;
  commentsCount: number;
  postTitle: string;
}

export function PostInteractions({
  initialLikes,
  commentsCount,
  postTitle,
}: PostInteractionsProps) {
  const { toast } = useToast();
  const [likes, setLikes] = useState(initialLikes);
  const [isLiked, setIsLiked] = useState(false);

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
    const text = `Check out this article: ${postTitle}`;
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
