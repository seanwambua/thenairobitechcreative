'use client';

import { useEffect } from 'react';
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
import { placeholderImages } from '@/lib/placeholder-images';

const formSchema = z.object({
  title: z.string().min(5, 'Title must be at least 5 characters.'),
  description: z.string().min(10, 'Description must be at least 10 characters.'),
  content: z.string().min(50, 'Content must be at least 50 characters.'),
  author: z.string().min(2, 'Author name must be at least 2 characters.'),
});

type PostFormValues = z.infer<typeof formSchema>;

interface PostEditorSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  post: Post | null;
}

const generateSlug = (title: string) => {
    return title
      .toLowerCase()
      .replace(/[^a-z0-9\s-]/g, '')
      .trim()
      .replace(/\s+/g, '-')
      .replace(/-+/g, '-');
};

export function PostEditorSheet({ isOpen, setIsOpen, post }: PostEditorSheetProps) {
  const { toast } = useToast();
  const { addPost, updatePost } = usePostStore();
  
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
  }, [post, form, isOpen]);


  function onSubmit(values: PostFormValues) {
    const slug = generateSlug(values.title);
    
    if (post) {
      // Update existing post
      const updatedPost: Post = {
        ...post,
        ...values,
        slug,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
      };
      updatePost(updatedPost);
      toast({
        title: 'Post Updated!',
        description: `"${values.title}" has been successfully updated.`,
      });
    } else {
      // Create new post
      const newPost: Post = {
        id: Date.now(),
        ...values,
        slug,
        imageUrl: placeholderImages.blog1.imageUrl,
        imageHint: placeholderImages.blog1.imageHint,
        authorAvatarUrl: placeholderImages.testimonial1.imageUrl,
        authorAvatarHint: placeholderImages.testimonial1.imageHint,
        date: new Date().toLocaleDateString('en-US', { month: 'short', day: 'numeric', year: 'numeric' }),
        likes: 0,
        comments: [],
      };
      addPost(newPost);
      toast({
        title: 'Post Created!',
        description: `"${values.title}" has been successfully created.`,
      });
    }

    form.reset();
    setIsOpen(false);
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
                <Button type="submit">Save Post</Button>
            </SheetFooter>
          </form>
        </Form>
        </div>
      </SheetContent>
    </Sheet>
  );
}
