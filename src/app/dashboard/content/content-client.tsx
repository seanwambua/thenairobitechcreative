'use client';

import { useEffect, useState } from 'react';
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from '@/components/ui/table';
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuTrigger,
  DropdownMenuSeparator,
} from '@/components/ui/dropdown-menu';
import {
  AlertDialog,
  AlertDialogAction,
  AlertDialogCancel,
  AlertDialogContent,
  AlertDialogDescription,
  AlertDialogFooter,
  AlertDialogHeader,
  AlertDialogTitle,
} from '@/components/ui/alert-dialog';
import { Button } from '@/components/ui/button';
import { usePostStore } from '@/store/posts';
import { MoreHorizontal, PlusCircle, Loader2 } from 'lucide-react';
import { Badge } from '@/components/ui/badge';
import { PostEditorSheet } from '@/components/post-editor-sheet';
import { useToast } from '@/hooks/use-toast';
import type { Post } from '@/store/posts';
import { format } from 'date-fns';
import { CardContent, CardHeader } from '@/components/ui/card';

export function ContentClient({ initialPosts }: { initialPosts: Post[] }) {
  const { posts, setPosts, deletePost, isLoading, error } = usePostStore();
  const [isEditorOpen, setEditorOpen] = useState(false);
  const [editingPost, setEditingPost] = useState<Post | null>(null);
  const [isDeleteDialogOpen, setDeleteDialogOpen] = useState(false);
  const [postToDelete, setPostToDelete] = useState<Post | null>(null);
  const { toast } = useToast();
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);

  useEffect(() => {
    setPosts(initialPosts);
  }, [initialPosts, setPosts]);

  useEffect(() => {
    const bc = new BroadcastChannel('app-data-channel');
    setChannel(bc);
    return () => {
      bc.close();
    };
  }, []);

  const handleCreateNew = () => {
    setEditingPost(null);
    setEditorOpen(true);
  };

  const handleEdit = (post: Post) => {
    setEditingPost(post);
    setEditorOpen(true);
  };

  const handleDeleteInitiate = (post: Post) => {
    setPostToDelete(post);
    setDeleteDialogOpen(true);
  };

  const handleDeleteConfirm = async () => {
    if (postToDelete) {
      try {
        await deletePost(postToDelete.id);
        toast({
          title: 'Post Deleted',
          description: `"${postToDelete.title}" has been successfully deleted.`,
        });
        channel?.postMessage({ type: 'refetch_posts' });
      } catch (e) {
        toast({
          variant: 'destructive',
          title: 'Error',
          description: 'Failed to delete post.',
        });
      } finally {
        setDeleteDialogOpen(false);
        setPostToDelete(null);
      }
    }
  };

  return (
    <>
      <div className="flex justify-end p-6 pt-0">
        <Button onClick={handleCreateNew}>
          <PlusCircle className="mr-2 h-4 w-4" />
          Create New Post
        </Button>
      </div>
      <CardContent>
        {isLoading && !posts.length ? (
          <div className="flex justify-center p-8">
            <Loader2 className="h-8 w-8 animate-spin" />
          </div>
        ) : error && !posts.length ? (
          <div className="py-8 text-center text-destructive">{error}</div>
        ) : (
          <Table>
            <TableHeader>
              <TableRow>
                <TableHead>Title</TableHead>
                <TableHead className="hidden md:table-cell">Author</TableHead>
                <TableHead className="hidden md:table-cell">Date</TableHead>
                <TableHead className="hidden md:table-cell">Status</TableHead>
                <TableHead>
                  <span className="sr-only">Actions</span>
                </TableHead>
              </TableRow>
            </TableHeader>
            <TableBody>
              {posts.map((post) => (
                <TableRow key={post.id}>
                  <TableCell className="font-medium">{post.title}</TableCell>
                  <TableCell className="hidden md:table-cell">{post.author}</TableCell>
                  <TableCell className="hidden md:table-cell">
                    {format(new Date(post.createdAt), 'MMM d, yyyy')}
                  </TableCell>
                  <TableCell className="hidden md:table-cell">
                    <Badge variant="outline">Published</Badge>
                  </TableCell>
                  <TableCell>
                    <DropdownMenu>
                      <DropdownMenuTrigger asChild>
                        <Button aria-haspopup="true" size="icon" variant="ghost">
                          <MoreHorizontal className="h-4 w-4" />
                          <span className="sr-only">Toggle menu</span>
                        </Button>
                      </DropdownMenuTrigger>
                      <DropdownMenuContent align="end">
                        <DropdownMenuItem onClick={() => handleEdit(post)}>Edit</DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem
                          onClick={() => handleDeleteInitiate(post)}
                          className="text-destructive"
                        >
                          Delete
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))}
            </TableBody>
          </Table>
        )}
      </CardContent>
      <PostEditorSheet isOpen={isEditorOpen} setIsOpen={setEditorOpen} post={editingPost} />
      <AlertDialog open={isDeleteDialogOpen} onOpenChange={setDeleteDialogOpen}>
        <AlertDialogContent>
          <AlertDialogHeader>
            <AlertDialogTitle>Are you sure?</AlertDialogTitle>
            <AlertDialogDescription>
              This action cannot be undone. This will permanently delete the post titled &quot;
              {postToDelete?.title}&quot;.
            </AlertDialogDescription>
          </AlertDialogHeader>
          <AlertDialogFooter>
            <AlertDialogCancel>Cancel</AlertDialogCancel>
            <AlertDialogAction onClick={handleDeleteConfirm}>Continue</AlertDialogAction>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  );
}
