'use client';

import { useEffect, useState } from 'react';
import Image from 'next/image';
import { Button, buttonVariants } from '@/components/ui/button';
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
  SheetClose,
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
import { useToast } from '@/hooks/use-toast';
import type { Post } from '@/app/generated/prisma';
import { Loader2, Upload } from 'lucide-react';
import { PostInputSchema } from '@/lib/schemas';
import { createPost, updatePost } from '@/app/actions/posts';
import { Avatar, AvatarFallback, AvatarImage } from './ui/avatar';
import { CldUploadButton } from 'next-cloudinary';
import { cn } from '@/lib/utils';
import placeholderImages from '@/app/lib/placeholder-images.json';
import RichTextEditor from './rich-text-editor';
import { Textarea } from '@/components/ui/textarea';

type PostFormValues = z.infer<typeof PostInputSchema>;

interface PostEditorSheetProps {
  isOpen: boolean;
  setIsOpen: (isOpen: boolean) => void;
  post: Post | null;
  onSave: () => void;
}

export function PostEditorSheet({
  isOpen,
  setIsOpen,
  post,
  onSave,
}: PostEditorSheetProps) {
  const { toast } = useToast();
  const [isLoading, setIsLoading] = useState(false);
  const [coverImagePreview, setCoverImagePreview] = useState<string | null>(
    null
  );
  const [avatarPreview, setAvatarPreview] = useState<string | null>(null);
  const [isUploading, setIsUploading] = useState<string | null>(null);

  const form = useForm<PostFormValues>({
    resolver: zodResolver(PostInputSchema),
    defaultValues: {
      title: '',
      description: '',
      content: '',
      author: 'Admin User',
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
        setCoverImagePreview(post.imageUrl);
        setAvatarPreview(post.authorAvatarUrl);
      } else {
        form.reset({
          title: '',
          description: '',
          content: '',
          author: 'Admin User',
        });
        setCoverImagePreview(placeholderImages.blog1Image.imageUrl);
        setAvatarPreview(placeholderImages.testimonial1Image.imageUrl);
      }
    }
  }, [post, form, isOpen]);

  const handleUploadSuccess = (result: any, type: 'cover' | 'avatar') => {
    const secure_url = result.info.secure_url;
    if (type === 'cover') {
      setCoverImagePreview(secure_url);
    } else {
      setAvatarPreview(secure_url);
    }
    toast({
      title: 'Image Uploaded',
      description: `The ${type} image has been updated.`,
    });
    setIsUploading(null);
  };

  async function onSubmit(values: PostFormValues) {
    setIsLoading(true);
    try {
      if (post) {
        const updatedPostData = {
          ...post,
          ...values,
          imageUrl: coverImagePreview!,
          authorAvatarUrl: avatarPreview!,
        };
        await updatePost(updatedPostData);
      } else {
        await createPost({
          ...values,
          imageUrl: coverImagePreview!,
          authorAvatarUrl: avatarPreview!,
        });
      }

      toast({
        title: `Post ${post ? 'Updated' : 'Created'}!`,
        description: `"${values.title}" has been successfully saved.`,
      });
      onSave();
    } catch (error) {
      toast({
        variant: 'destructive',
        title: 'Error',
        description: `Failed to ${post ? 'update' : 'create'} post.`,
      });
    } finally {
      setIsLoading(false);
    }
  }

  return (
    <Sheet open={isOpen} onOpenChange={setIsOpen} modal={false}>
      <SheetContent className="w-full overflow-y-auto sm:max-w-2xl">
        <SheetHeader>
          <SheetTitle>{post ? 'Edit Post' : 'Create New Post'}</SheetTitle>
          <SheetDescription>
            {post
              ? 'Make changes to your existing post.'
              : 'Fill out the details for your new blog post.'}
          </SheetDescription>
        </SheetHeader>
        <div className="py-8">
          <Form {...form}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="space-y-6">
              <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
                <FormItem>
                  <FormLabel>Cover Image</FormLabel>
                  <div className="relative aspect-video w-full overflow-hidden rounded-md">
                    {coverImagePreview && (
                      <Image
                        src={coverImagePreview}
                        alt="Cover image preview"
                        fill
                        className="object-cover"
                      />
                    )}
                    {isUploading === 'cover' && (
                      <div className="absolute inset-0 flex items-center justify-center bg-black/50">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                  <CldUploadButton
                    options={{
                      sources: ['local', 'url', 'unsplash'],
                      styles: {
                        zIndex: 99999,
                      },
                    }}
                    uploadPreset="nairobi_techcreative"
                    onSuccess={(result: any) =>
                      handleUploadSuccess(result, 'cover')
                    }
                    onUpload={() => setIsUploading('cover')}
                    onError={() => setIsUploading(null)}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'w-full',
                      isUploading !== null && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading === 'cover' ? 'Uploading...' : 'Upload Cover'}
                  </CldUploadButton>
                </FormItem>
                <FormItem className="flex flex-col items-center">
                  <FormLabel>Author Avatar</FormLabel>
                  <div className="relative">
                    <Avatar className="h-32 w-32">
                      {avatarPreview && (
                        <AvatarImage src={avatarPreview} alt="Avatar preview" />
                      )}
                      <AvatarFallback>
                        {form.getValues('author')?.charAt(0) || '?'}
                      </AvatarFallback>
                    </Avatar>
                    {isUploading === 'avatar' && (
                      <div className="absolute inset-0 flex items-center justify-center rounded-full bg-black/50">
                        <Loader2 className="h-8 w-8 animate-spin text-white" />
                      </div>
                    )}
                  </div>
                  <CldUploadButton
                    options={{
                      sources: ['local', 'url', 'unsplash'],
                      styles: {
                        zIndex: 99999,
                      },
                    }}
                    uploadPreset="nairobi_techcreative"
                    onSuccess={(result: any) =>
                      handleUploadSuccess(result, 'avatar')
                    }
                    onUpload={() => setIsUploading('avatar')}
                    onError={(error) => {
                      setIsUploading(false);
                      toast({
                        variant: 'destructive',
                        title: 'Upload Failed',
                        description: String((error as any).info),
                      });
                    }}
                    className={cn(
                      buttonVariants({ variant: 'outline' }),
                      'mt-2',
                      isUploading !== null && 'cursor-not-allowed opacity-50'
                    )}
                  >
                    <Upload className="mr-2 h-4 w-4" />
                    {isUploading === 'avatar'
                      ? 'Uploading...'
                      : 'Upload Avatar'}
                  </CldUploadButton>
                </FormItem>
              </div>

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
                      <RichTextEditor
                        value={field.value}
                        onChange={field.onChange}
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
                  <Button type="button" variant="outline">
                    Cancel
                  </Button>
                </SheetClose>
                <Button
                  type="submit"
                  disabled={isLoading || isUploading !== null}
                  onClick={form.handleSubmit(onSubmit)}
                >
                  {(isLoading || isUploading) && (
                    <Loader2 className="mr-2 h-4 w-4 animate-spin" />
                  )}
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
