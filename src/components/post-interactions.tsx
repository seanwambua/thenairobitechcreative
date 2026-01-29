'use client';

import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle } from 'lucide-react';
import { likePost, unlikePost } from '@/app/actions/likes';
import type { Post } from '@/app/generated/prisma';

interface PostInteractionsProps {
  post: Post;
  likes: number;
  hasLiked: boolean;
  commentsCount: number;
}

export function PostInteractions({
  post,
  likes,
  hasLiked,
  commentsCount,
}: PostInteractionsProps) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [liked, setLiked] = useState(hasLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = async () => {
    if (!session?.user?.id) return;
    startTransition(async () => {
      if (liked) {
        await unlikePost({ postId: post.id });
        setLikeCount((prev) => prev - 1);
        setLiked(false);
      } else {
        await likePost({ postId: post.id });
        setLikeCount((prev) => prev + 1);
        setLiked(true);
      }
    });
  };

  return (
    <div className="flex items-center gap-6">
      <div className="flex items-center gap-2">
        <Button
          variant="ghost"
          size="icon"
          onClick={handleLike}
          disabled={isPending || !session?.user?.id}
        >
          <Heart className={`h-6 w-6 ${liked ? 'fill-red-500 text-red-500' : ''}`} />
        </Button>
        <span>{likeCount}</span>
      </div>
      <div className="flex items-center gap-2">
        <MessageCircle className="h-6 w-6 text-muted-foreground" />
        <span>{commentsCount}</span>
      </div>
    </div>
  );
}
