'use client';

import { useEffect, useState } from 'react';
import { Button } from '@/components/ui/button';
import { useForm } from 'react-hook-form';
import { z } from 'zod';
import { zodResolver } from '@hookform/resolvers/zod';
import {
  Sheet,
  SheetContent,
  SheetDescription,
  SheetHeader,
  SheetTitle,
  SheetFooter,
  SheetClose
} from '@/components/ui/sheet';
import {
  Form,
  FormControl,
  FormField,
  FormItem,
  FormLabel,
  FormMessage,
} from '@/components/ui/form';
import { Input } from '@/components/ui/input';
import { Textarea } from '@/components/ui/textarea';
import { useToast } from '@/hooks/use-toast';
import { usePostStore, type Post } from '@/store/posts';
import { Loader2 } from 'lucide-react';
import { PostSchema } from '@/lib/schemas';

const formSchema = PostSchema.pick({
  title: true,
  description: true,
  content: true,
  author: true,
});

type PostFormValues = z.infer<typeof formSchema>;

interface PostEditorSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  post: Post | null;
}

export function PostEditorSheet({ isOpen, setIsOpen, post }: PostEditorSheetProps) {
  const { toast } = useToast();
  const { addPost, updatePost, isLoading } = usePostStore();
  const [channel, setChannel] = useState<BroadcastChannel | null>(null);

  useEffect(() => {
    const bc = new BroadcastChannel('app-data-channel');
    setChannel(bc);
    return () => {
      bc.close();
    };
  }, []);
  
  const form = useForm<PostFormValues>({
    resolver: zodResolver(formSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      author: 'Jalen Doe' // Default author
    },
  });
  
  useEffect(() => {
    if (isOpen) {
        if (post) {
          form.reset({
            title: post.title,
            description: post.description,
            content: post.content,
            author: post.author,
          });
        } else {
          form.reset({
            title: '',
            description: '',
            content: '',
            author: 'Jalen Doe',
          });
        }
    }
  }, [post, form, isOpen]);


  async function onSubmit(values: PostFormValues) {
    try {
      if (post) {
        const updatedPostData = {
          ...post,
          ...values,
          slug: values.title.toLowerCase().replace(/\s+/g, '-'),
        };
        await updatePost(updatedPostData);
      } else {
        await addPost(values);
      }

      toast({
          title: `Post ${post ? 'Updated' : 'Created'}!`,
          description: `"${values.title}" has been successfully saved.`,
      });
      channel?.postMessage({ type: 'refetch_posts' });
      setIsOpen(false);
    } catch (error) {
       toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to ${post ? 'update' : 'create'} post.`,
      });
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen}>
      <SheetContent className="w-full sm:max-w-2xl overflow-y-auto">
        <SheetHeader>
          <SheetTitle>{post ? 'Edit Post' : 'Create New Post'}</SheetTitle>
          <SheetDescription>
            {post ? 'Make changes to your existing post.' : 'Fill out the details for your new blog post.'}
          </SheetDescription>
        </SheetHeader>
        <div className="py-8">
        <Form {...form}>
          <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
            <FormField
              control={form.control}
              name="title"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Title</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter post title" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="description"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Description</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Enter a short summary of the post"
                      className="resize-none"
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <FormField
              control={form.control}
              name="content"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Content</FormLabel>
                  <FormControl>
                    <Textarea
                      placeholder="Write your blog post content here. Use double line breaks for paragraphs."
                      className="resize-y"
                      rows={15}
                      {...field}
                    />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
             <FormField
              control={form.control}
              name="author"
              render={({ field }) => (
                <FormItem>
                  <FormLabel>Author</FormLabel>
                  <FormControl>
                    <Input placeholder="Enter author's name" {...field} />
                  </FormControl>
                  <FormMessage />
                </FormItem>
              )}
            />
            <SheetFooter>
                <SheetClose asChild>
                    <Button type="button" variant="outline">Cancel</Button>
                </SheetClose>
                <Button type="submit" disabled={isLoading}>
                    {isLoading && <Loader2 className="mr-2 h-4 w-4 animate-spin" />}
                    Save Post
                </Button>
            </SheetFooter>
          </form>
        </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
