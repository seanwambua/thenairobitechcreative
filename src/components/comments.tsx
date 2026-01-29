'use client';

import { useState } from 'react';
import { useSession } from 'next-auth/react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { Card, CardContent } from '@/components/ui/card';
import { Trash2, Edit } from 'lucide-react';
import {
  createComment,
  updateComment,
  deleteComment,
} from '@/app/actions/comments';
import type { Comment, User } from '@/app/generated/prisma';

interface CommentsProps {
  postId: number;
  comments: (Comment & { user: User })[];
}

export function Comments({ postId, comments }: CommentsProps) {
  const { data: session } = useSession();
  const [content, setContent] = useState('');
  const [editingCommentId, setEditingCommentId] = useState<number | null>(null);
  const [editingContent, setEditingContent] = useState('');

  const handleCreateComment = async () => {
    if (content.trim()) {
      await createComment({ postId, content });
      setContent('');
    }
  };

  const handleUpdateComment = async (commentId: number) => {
    if (editingContent.trim()) {
      await updateComment(commentId, editingContent);
      setEditingCommentId(null);
      setEditingContent('');
    }
  };

  const handleDeleteComment = async (commentId: number) => {
    await deleteComment(commentId);
  };

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
            />
            <Button onClick={handleCreateComment} className="self-end">
              Post Comment
            </Button>
          </div>
        )}
        <div className="mt-8 flex flex-col gap-6">
          {comments.map((comment) => (
            <Card key={comment.id}>
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
                      <div>
                        <p className="font-semibold">{comment.user.name}</p>
                        <p className="text-sm text-muted-foreground">
                          {new Date(comment.createdAt).toLocaleDateString(
                            'en-US',
                            {
                              month: 'short',
                              day: 'numeric',
                              year: 'numeric',
                            }
                          )}
                        </p>
                      </div>
                      {session?.user?.id === comment.userId && (
                        <div className="flex items-center gap-2">
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => {
                              setEditingCommentId(comment.id);
                              setEditingContent(comment.content);
                            }}
                          >
                            <Edit className="h-4 w-4" />
                          </Button>
                          <Button
                            variant="ghost"
                            size="icon"
                            onClick={() => handleDeleteComment(comment.id)}
                          >
                            <Trash2 className="h-4 w-4" />
                          </Button>
                        </div>
                      )}
                    </div>
                    {editingCommentId === comment.id ? (
                      <div className="mt-4 flex flex-col gap-2">
                        <Textarea
                          value={editingContent}
                          onChange={(e) => setEditingContent(e.target.value)}
                        />
                        <div className="self-end">
                          <Button
                            onClick={() => handleUpdateComment(comment.id)}
                          >
                            Save
                          </Button>
                          <Button
                            variant="ghost"
                            onClick={() => setEditingCommentId(null)}
                          >
                            Cancel
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
