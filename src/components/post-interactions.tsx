'use client';

import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Button } from '@/components/ui/button';
import { Heart, MessageCircle, Smile } from 'lucide-react';
import { likePost, unlikePost } from '@/lib/actions/likes';
import { toggleReaction } from '@/lib/actions/posts';
import type { Post, User, Reaction } from '@prisma/client';
import {
  Popover,
  PopoverContent,
  PopoverTrigger,
} from '@/components/ui/popover';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';

const EMOJIS = ['👍', '❤️', '🔥', '😮', '🚀'];

interface PostInteractionsProps {
  post: Post & { reactions: Reaction[] };
  likes: number;
  hasLiked: boolean;
  commentsCount: number;
  currentUser: User | null;
}

export function PostInteractions({
  post,
  likes,
  hasLiked,
  commentsCount,
  currentUser,
}: PostInteractionsProps) {
  const [isPending, startTransition] = useTransition();
  const [liked, setLiked] = useState(hasLiked);
  const [likeCount, setLikeCount] = useState(likes);

  const handleLike = async () => {
    if (!currentUser?.id) return;
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

  const handleReaction = async (emoji: string) => {
    if (!currentUser?.id) return;
    startTransition(async () => {
      await toggleReaction(post.id, emoji);
    });
  };

  const reactionCounts = post.reactions.reduce((acc, curr) => {
    acc[curr.emoji] = (acc[curr.emoji] || 0) + 1;
    return acc;
  }, {} as Record<string, number>);

  const userReactions = new Set(
    post.reactions
      .filter((r) => r.userId === currentUser?.id)
      .map((r) => r.emoji)
  );

  return (
    <div className="flex flex-col gap-4">
      <div className="flex items-center gap-6">
        <div className="flex items-center gap-2">
          <Button
            variant="ghost"
            size="sm"
            onClick={handleLike}
            disabled={isPending || !currentUser?.id}
            className={cn(liked && "text-red-500 hover:text-red-600")}
          >
            <Heart className={cn("mr-2 h-5 w-5", liked && "fill-current")} />
            <span className="font-medium">{likeCount}</span>
          </Button>
        </div>

        <div className="flex items-center gap-2">
          <Popover>
            <PopoverTrigger asChild>
              <Button
                variant="ghost"
                size="sm"
                disabled={!currentUser?.id}
              >
                <Smile className="mr-2 h-5 w-5" />
                <span className="font-medium">React</span>
              </Button>
            </PopoverTrigger>
            <PopoverContent className="w-auto p-2" side="top">
              <div className="flex gap-2">
                {EMOJIS.map((emoji) => (
                  <button
                    key={emoji}
                    onClick={() => handleReaction(emoji)}
                    className={cn(
                      "rounded-lg p-2 text-2xl transition-transform hover:scale-125 active:scale-95",
                      userReactions.has(emoji) && "bg-muted"
                    )}
                  >
                    {emoji}
                  </button>
                ))}
              </div>
            </PopoverContent>
          </Popover>
        </div>

        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <MessageCircle className="h-5 w-5" />
          <span className="font-medium">{commentsCount}</span>
        </div>
      </div>

      {post.reactions.length > 0 && (
        <div className="flex flex-wrap gap-2">
          {Object.entries(reactionCounts).map(([emoji, count]) => (
            <Badge
              key={emoji}
              variant="secondary"
              className={cn(
                "cursor-pointer px-2 py-1 text-sm font-medium transition-colors",
                userReactions.has(emoji) && "border-primary bg-primary/10 text-primary"
              )}
              onClick={() => handleReaction(emoji)}
            >
              <span className="mr-1">{emoji}</span>
              <span>{count}</span>
            </Badge>
          ))}
        </div>
      )}
    </div>
  );
}
