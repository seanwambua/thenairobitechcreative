'use client';

import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Edit, Pin, PinOff } from 'lucide-react';
import {
  createComment,
  updateComment,
  deleteComment,
  togglePinComment,
} from '@/lib/actions/comments';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Role } from '@/lib/roles';
import { CommentWithUser } from '@/lib/definitions'; // Import the new type

interface CommentsProps {
  postId: number;
  comments: CommentWithUser[];
  postAuthorId: string;
}

export function Comments({ postId, comments, postAuthorId }: CommentsProps) {
  const { data: session } = useSession();
  const [isPending, startTransition] = useTransition();
  const [content, setContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const handleCreateComment = async () => {
    if (content.trim()) {
      startTransition(async () => {
        const formData = new FormData();
        formData.append('content', content);
        formData.append('postId', String(postId));
        await createComment(formData);
        setContent('');
      });
    }
  };

  const handleUpdateComment = async (commentId: number) => {
    if (editingContent.trim()) {
      startTransition(async () => {
        await updateComment(commentId, editingContent);
        setEditingCommentId(null);
        setEditingContent('');
      });
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    startTransition(async () => {
      await deleteComment(commentId);
    });
  };

  const handlePinComment = async (commentId: number) => {
    startTransition(async () => {
      await togglePinComment(commentId);
    });
  };

  const canPin = session?.user?.id === postAuthorId || session?.user?.role === Role.ADMIN;

  return (
    <section className="mt-12">
      <h2 className="font-headline text-3xl font-bold">Comments</h2>
      <div className="mt-6">
        {session?.user && (
          <div className="flex flex-col gap-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Add a comment..."
              disabled={isPending}
            />
            <div className="flex justify-end">
              <Button 
                onClick={handleCreateComment} 
                disabled={isPending || !content.trim()}
              >
                {isPending ? "Posting..." : "Post Comment"}
              </Button>
            </div>
          </div>
        )}

        <div className="mt-8 flex flex-col gap-6">
          {comments.map((comment) => (
            <Card 
              key={comment.id}
              className={cn(
                "transition-all duration-300",
                comment.isPinned && "border-primary/50 bg-primary/5 ring-1 ring-primary/20 shadow-sm"
              )}
            >
              <CardContent className="p-6">
                <div className="flex items-start gap-4">
                  <Avatar className="h-10 w-10 border-2 border-primary">
                    <AvatarImage
                      src={comment.user.image || ''}
                      alt={comment.user.name || ''}
                    />
                    <AvatarFallback>
                      {comment.user.name?.charAt(0)}
                    </AvatarFallback>
                  </Avatar>
                  
                  <div className="flex-1">
                    <div className="flex items-center justify-between">
                      <div className="flex flex-col gap-1">
                        <div className="flex items-center gap-2">
                          <p className="font-semibold">{comment.user.name}</p>
                          {comment.isPinned && (
                            <Badge variant="secondary" className="h-5 px-1.5 text-[10px] font-bold">
                              <Pin className="mr-1 h-3 w-3 fill-current" />
                              PINNED
                            </Badge>
                          )}
                        </div>
                        <p className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString('en-US', {
                            month: 'short',
                            day: 'numeric',
                            year: 'numeric',
                          })}
                        </p>
                      </div>

                      <div className="flex items-center gap-1">
                        {canPin && (
                          <Button
                            variant="ghost"
                            size="icon"
                            className={cn(
                              "h-8 w-8",
                              comment.isPinned ? "text-primary" : "text-muted-foreground"
                            )}
                            onClick={() => handlePinComment(comment.id)}
                            disabled={isPending}
                            title={comment.isPinned ? "Unpin Comment" : "Pin Comment"}
                          >
                            {comment.isPinned ? <PinOff className="h-4 w-4" /> : <Pin className="h-4 w-4" />}
                          </Button>
                        )}
                        {(session?.user?.id === comment.userId || session?.user?.role === Role.ADMIN) && (
                          <>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8"
                              onClick={() => {
                                setEditingCommentId(comment.id);
                                setEditingContent(comment.content);
                              }}
                              disabled={isPending}
                            >
                              <Edit className="h-4 w-4" />
                            </Button>
                            <Button
                              variant="ghost"
                              size="icon"
                              className="h-8 w-8 text-destructive hover:bg-destructive/10"
                              onClick={() => handleDeleteComment(comment.id)}
                              disabled={isPending}
                            >
                              <Trash2 className="h-4 w-4" />
                            </Button>
                          </>
                        )}
                      </div>
                    </div>

                    {editingCommentId === comment.id ? (
                      <div className="mt-4 flex flex-col gap-2">
                        <Textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                          disabled={isPending}
                        />
                        <div className="flex justify-end gap-2">
                          <Button
                            variant="ghost"
                            onClick={() => setEditingCommentId(null)}
                            disabled={isPending}
                          >
                            Cancel
                          </Button>
                          <Button
                            onClick={() => handleUpdateComment(comment.id)}
                            disabled={isPending || !editingContent.trim()}
                          >
                            Save
                          </Button>
                        </div>
                      </div>
                    ) : (
                      <p className="mt-4 text-pretty leading-relaxed">
                        {comment.content}
                      </p>
                    )}
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>
      </div>
    </section>
  );
}
