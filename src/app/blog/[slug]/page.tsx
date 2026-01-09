'use client';

import { useState } from 'react';
import { notFound } from 'next/navigation';
import Image from 'next/image';
import { posts, PostComment } from '@/lib/data';
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
  Pencil,
  Trash,
  X,
  Check,
} from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { AlertDialog, AlertDialogAction, AlertDialogCancel, AlertDialogContent, AlertDialogDescription, AlertDialogFooter, AlertDialogHeader, AlertDialogTitle, AlertDialogTrigger } from '@/components/ui/alert-dialog';


export default function BlogPostPage({ params }: { params: { slug: string } }) {
  const { toast } = useToast();
  const post = posts.find((p) => p.slug === params.slug);

  const [likes, setLikes] = useState(post?.likes || 0);
  const [isLiked, setIsLiked] = useState(false);
  const [comments, setComments] = useState<PostComment[]>(post?.comments || []);
  const [newComment, setNewComment] = useState('');

  // State for editing comments
  const [editingCommentId, setEditingCommentId] = useState<string | null>(null);
  const [editingText, setEditingText] = useState('');

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
      const newCommentData: PostComment = {
        id: `comment-${Date.now()}`, // Simple unique ID
        author: 'Guest', // In a real app, this would come from an auth session
        text: newComment.trim(),
        avatarUrl: 'https://picsum.photos/seed/guest/40/40',
      };
      setComments([...comments, newCommentData]);
      setNewComment('');
      toast({
        title: 'Comment Posted!',
        description: 'Thanks for your feedback.',
      });
    }
  };

  const handleEdit = (comment: PostComment) => {
    setEditingCommentId(comment.id);
    setEditingText(comment.text);
  };

  const handleCancelEdit = () => {
    setEditingCommentId(null);
    setEditingText('');
  };

  const handleSaveEdit = (commentId: string) => {
    if (!editingText.trim()) {
        toast({
            variant: 'destructive',
            title: 'Error',
            description: 'Comment cannot be empty.',
        });
        return;
    }
    setComments(
      comments.map((c) =>
        c.id === commentId ? { ...c, text: editingText.trim() } : c
      )
    );
    handleCancelEdit();
    toast({
        title: 'Comment Updated!',
        description: 'Your comment has been successfully updated.',
    });
  };

  const handleDelete = (commentId: string) => {
    setComments(comments.filter((c) => c.id !== commentId));
    toast({
        title: 'Comment Deleted',
        description: 'Your comment has been removed.',
    });
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
              {comments.map((comment) => (
                <Card key={comment.id}>
                  <CardContent className="flex items-start gap-4 p-6">
                    <Avatar className="h-10 w-10">
                      <AvatarImage src={comment.avatarUrl} alt={comment.author} />
                      <AvatarFallback>{comment.author.charAt(0)}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center justify-between">
                        <p className="font-semibold">{comment.author}</p>
                        {editingCommentId !== comment.id && (
                          <div className="flex items-center gap-2">
                            <Button variant="ghost" size="icon" onClick={() => handleEdit(comment)}>
                                <Pencil className="h-4 w-4 text-muted-foreground" />
                            </Button>
                             <AlertDialog>
                                <AlertDialogTrigger asChild>
                                    <Button variant="ghost" size="icon">
                                        <Trash className="h-4 w-4 text-muted-foreground" />
                                    </Button>
                                </AlertDialogTrigger>
                                <AlertDialogContent>
                                    <AlertDialogHeader>
                                        <AlertDialogTitle>Are you sure?</AlertDialogTitle>
                                        <AlertDialogDescription>
                                            This action cannot be undone. This will permanently delete your comment.
                                        </AlertDialogDescription>
                                    </AlertDialogHeader>
                                    <AlertDialogFooter>
                                        <AlertDialogCancel>Cancel</AlertDialogCancel>
                                        <AlertDialogAction onClick={() => handleDelete(comment.id)}>
                                            Delete
                                        </AlertDialogAction>
                                    </AlertDialogFooter>
                                </AlertDialogContent>
                            </AlertDialog>
                          </div>
                        )}
                      </div>
                      {editingCommentId === comment.id ? (
                        <div className="mt-2">
                           <Textarea
                            value={editingText}
                            onChange={(e) => setEditingText(e.target.value)}
                            className="mb-2"
                            rows={3}
                          />
                          <div className="flex justify-end gap-2">
                            <Button variant="ghost" size="sm" onClick={handleCancelEdit}>
                              Cancel <X className="ml-1 h-4 w-4" />
                            </Button>
                            <Button size="sm" onClick={() => handleSaveEdit(comment.id)}>
                              Save <Check className="ml-1 h-4 w-4" />
                            </Button>
                          </div>
                        </div>
                      ) : (
                        <p className="mt-1 text-muted-foreground">{comment.text}</p>
                      )}
                    </div>
                  </CardContent>
                </Card>
              ))}
            </div>
            <form onSubmit={handleCommentSubmit} className="mt-8">
              <Card>
                <CardContent className="p-6">
                  <h3 className="text-lg font-semibold">Leave a Comment</h3>
                  <p className="text-sm text-muted-foreground">Your feedback is valuable to us. (Editing/deleting is enabled for all comments for demonstration purposes.)</p>
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
