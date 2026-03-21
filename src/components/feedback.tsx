'use client';

import { useState, useTransition } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Edit, X } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import { Role } from '@/lib/roles';
import { CommentWithUser } from '@/lib/definitions';
import { createComment, updateComment, deleteComment } from '@/lib/actions/comments';
import { motion, AnimatePresence } from 'framer-motion';

interface FeedbackProps {
  itemId: number;
  comments: CommentWithUser[];
}

export function Feedback({ itemId, comments }: FeedbackProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [isPending, startTransition] = useTransition();
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');
  const [isVisible, setIsVisible] = useState(true);

  const bannerVariants = {
    hidden: { y: '100%' },
    visible: { y: 0, transition: { type: 'spring', stiffness: 100, damping: 20 } },
    exit: { y: '100%', transition: { type: 'tween', duration: 0.2 } },
  };

  const handleCreateFeedback = async () => {
    if (!content.trim()) return;
    const formData = new FormData();
    formData.append('content', content);
    formData.append('postId', String(itemId));

    startTransition(async () => {
      await createComment(formData);
      setContent('');
    });
  };

  const handleUpdateFeedback = async (commentId: number) => {
    if (!editingContent.trim()) return;
    startTransition(async () => {
      await updateComment(commentId, editingContent);
      setEditingCommentId(null);
      setEditingContent('');
    });
  };

  const handleDeleteFeedback = async (commentId: number) => {
    startTransition(async () => {
      await deleteComment(commentId);
    });
  };

  const canEdit = (commentAuthorId: string) => {
    return session?.user?.id === commentAuthorId || session?.user?.role === Role.ADMIN;
  };

  const canDelete = (commentAuthorId: string) => {
    return session?.user?.id === commentAuthorId || session?.user?.role === Role.ADMIN;
  };

  return (
    <AnimatePresence>
      {isVisible && (
        <motion.div
          variants={bannerVariants}
          initial="hidden"
          animate="visible"
          exit="exit"
          className="fixed bottom-0 left-0 right-0 z-40 w-full"
        >
          <div className="relative max-h-[60vh] overflow-y-auto border-t bg-muted/90 p-8 backdrop-blur-sm">
            <Button
              variant="ghost"
              size="icon"
              className="absolute right-4 top-4 z-50"
              onClick={() => setIsVisible(false)}
            >
              <X className="h-6 w-6" />
              <span className="sr-only">Close banner</span>
            </Button>
            
            <h2 className="font-headline text-3xl font-bold">Feedback</h2>
            <div className="mt-6">
              {session?.user && (
                <div className="flex flex-col gap-4">
                  <Textarea
                    value={content}
                    onChange={(e) => setContent(e.target.value)}
                    placeholder="Share your feedback..."
                    disabled={isPending}
                  />
                  <div className="flex justify-end">
                    <Button
                      onClick={handleCreateFeedback}
                      disabled={isPending || !content.trim()}
                    >
                      {isPending ? 'Posting...' : 'Post Feedback'}
                    </Button>
                  </div>
                </div>
              )}

              <div className="mt-8 space-y-6">
                {comments.map((comment) => (
                  <Card key={comment.id} className={cn('overflow-hidden')}>
                    <CardContent className="p-6">
                      <div className="flex items-start gap-4">
                        <Avatar>
                          <AvatarImage src={comment.user.image ?? undefined} />
                          <AvatarFallback>{comment.user.name?.[0]}</AvatarFallback>
                        </Avatar>
                        <div className="flex-1">
                          <div className="flex items-center justify-between">
                            <div className="flex items-center gap-2">
                              <p className="font-semibold">{comment.user.name}</p>
                              {comment.user.role === Role.ADMIN && <Badge>Admin</Badge>}
                            </div>
                            <div className="flex items-center gap-2">
                              {(canEdit(comment.user.id)) && (
                                <Button variant="ghost" size="icon" onClick={() => {
                                  setEditingCommentId(comment.id);
                                  setEditingContent(comment.content);
                                }}>
                                  <Edit className="h-4 w-4" />
                                </Button>
                              )}
                              {(canDelete(comment.user.id)) && (
                                <Button variant="ghost" size="icon" onClick={() => handleDeleteFeedback(comment.id)}>
                                  <Trash2 className="h-4 w-4" />
                                </Button>
                              )}
                            </div>
                          </div>
                          {editingCommentId === comment.id ? (
                            <div className="mt-2">
                              <Textarea
                                value={editingContent}
                                onChange={(e) => setEditingContent(e.target.value)}
                                disabled={isPending}
                              />
                              <div className="mt-2 flex justify-end gap-2">
                                <Button variant="outline" onClick={() => setEditingCommentId(null)}>Cancel</Button>
                                <Button onClick={() => handleUpdateFeedback(comment.id)} disabled={isPending}>
                                  {isPending ? 'Updating...' : 'Update'}
                                </Button>
                              </div>
                            </div>
                          ) : (
                            <p className="mt-2 text-muted-foreground">{comment.content}</p>
                          )}
                        </div>
                      </div>
                    </CardContent>
                  </Card>
                ))}
              </div>
            </div>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
